import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import '../index.css'; // Assuming this contains your custom colors and basic styles

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { toast } from 'react-toastify';

// Fix for default marker icon in Leaflet with Webpack/CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- Constants ---
const DEFAULT_MAP_POSITION = [12.9675, 79.1325]; // Vellore
const INITIAL_MAP_ZOOM = 13;
const SELECTED_BRANCH_ZOOM = 16;
const DISTRICT_ZOOM = 13;

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const branchIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [36, 52],
  iconAnchor: [18, 52],
  popupAnchor: [0, -45],
});

const highlightIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854866.png',
  iconSize: [50, 60],
  iconAnchor: [25, 60],
  popupAnchor: [0, -52],
});

const selectedBranchIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
  iconSize: [60, 75],
  iconAnchor: [30, 75],
  popupAnchor: [0, -60],
});

// Branch Data (assuming this is static or fetched elsewhere)
const branches = [
  {
    district: "Vellore",
    name: "Dell Exclusive Store Katpadi",
    address: "NO. 340, Chittoor Bus Stop, Opp. Bharath Petroleum Bunk, Katpadi, Vellore, Tamil Nadu",
    phone: "9524889898",
    email: "velloredellstore@gmail.com",
    lat: 12.965338132424096,
    lng: 79.13719977092427,
  },
  {
    district: "Vellore",
    name: "Dell Exclusive Store Vellore",
    address: "18/13, Dharmaraja Kovil St, opp. Indian Bank, Thottapalayam, Vellore, Tamil Nadu 632004",
    phone: "9585639898",
    email: "desvellore2018@gmail.com",
    lat: 12.925774668584632,
    lng: 79.13321908072943,
  },
  {
    district: "Vellore",
    name: "DAAS COMPUTERS",
    address: "1G-4, Auxilium College Road Katpadi, Gandhi Nagar, Vellore, Tamil Nadu 632006",
    phone: "9842349898",
    email: null,
    lat: 12.958610494729118,
    lng: 79.14217460318437,
  },
  {
    district: "Vellore",
    name: "ASUS EXCLUSIVE STORE",
    address: "No.338, Chittoor Bus Stop, Opp. Bharath Petroleum Bunk, Katpadi, Vellore 632007, Tamilnadu",
    phone: "9087597742",
    email: "asusvellorestore@gmail.com",
    lat: 12.965211794625915,
    lng: 79.13717265138999,
  },
  {
    district: "Vellore",
    name: "LENOVO EXCLUSIVE STORE",
    address: "No.348, Chittoor Bus Stop, Opp. Bharath Petroleum Bunk, Katpadi, Vellore 632007, Tamilnadu",
    phone: "9943318833",
    email: "vlrlenovostore@gmail.com",
    lat: 12.965010874042465,
    lng: 79.13719114388296,
  },
  {
    district: "Vellore",
    name: "ACER MALL EXCLUSIVE STORE",
    address: "NO.342, CHITTOOR BUS STOP, Opp. Bharath Petroleum Bunk, KATPADI, VELLORE-7, Tamilnadu",
    phone: "9363290026,9842349898",
    email: "acermallvir@gmail.com",
    lat: 12.965326075860759,
    lng: 79.13716704549907,
  },
  {
    district: "Arani",
    name: "Arani Daas Computers",
    address: "Pudhukamoor Rd, opposite Jemini stop, Arani Palayam, Arani, Tamil Nadu 632301",
    phone: null,
    email: "arnidaascomputers@gmail.com",
    lat: 12.674624720660884,
    lng: 79.28618028093364,
  },
];

// Haversine formula to calculate distance between two points on a sphere (Earth)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Component to recenter the map view
const Recenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, INITIAL_MAP_ZOOM, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [position, map]);
  return null;
};

// Search input component
const SearchBox = ({ onSearch }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address);
      setAddress(''); // Clear search input after submission
    }
  };

  return (
    <div className="mb-6 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-2 border-gray-400 rounded-full overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] h-11"
      >
        <input
          type="text"
          className="flex-1 p-4 border-none outline-none text-sm text-gray-700 font-roboto"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Search for an address or district..."
          aria-label="Search address"
        />
        <button
          type="submit"
          className="w-11 h-full bg-custom-blue-light text-white text-xl flex items-center justify-center rounded-r-full cursor-pointer hover:bg-custom-blue-dark"
          aria-label="Submit search"
        >
          🔍
        </button>
      </form>
    </div>
  );
};

// List of branches for a district
const BranchList = ({ branches, selectedBranch, onSelectBranch }) => {
  if (!branches.length) {
    return <p className="text-sm text-gray-400 ml-4 mt-2 ">No branches found.</p>;
  }
  return (
    <ul className="flex flex-col gap-2 ml-4 mb-3">
      {branches.map((branch) => ( // Removed index, using branch.name as key for stability
        <motion.li
          key={branch.name} // Using branch name as key assuming it's unique
          className={`mt-3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer text-sm text-left text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_1px_6px_rgba(0,0,0,0.1)] ${
            selectedBranch && selectedBranch.name === branch.name
              ? 'bg-gradient-to-r from-indigo-500 to-teal-500 text-white border-indigo-500 font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.15)]'
              : ''
          }`}
          onClick={() => onSelectBranch(branch)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }} // Removed index * 0.05 delay as index is no longer explicit
          tabIndex={0} // Make list items focusable
          role="button" // Indicate that it's interactive
          aria-pressed={selectedBranch && selectedBranch.name === branch.name}
        >
          {branch.name}
        </motion.li>
      ))}
    </ul>
  );
};

// Map component displaying branches and user location
const BranchMap = ({ branches, selectedBranch, userLocation, selectedDistrict, accuracy }) => {
  const mapRef = useRef();
  const markerRefs = useRef({});
  const center = userLocation || DEFAULT_MAP_POSITION;

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance) return;

    if (selectedBranch) {
      mapInstance.flyTo([selectedBranch.lat, selectedBranch.lng], SELECTED_BRANCH_ZOOM, {
        animate: true,
        duration: 1.5,
      });
    } else if (selectedDistrict) {
      const districtBranches = branches.filter((b) => b.district === selectedDistrict);
      if (districtBranches.length > 0) {
        const avgLat = districtBranches.reduce((sum, b) => sum + b.lat, 0) / districtBranches.length;
        const avgLng = districtBranches.reduce((sum, b) => sum + b.lng, 0) / districtBranches.length;
        mapInstance.flyTo([avgLat, avgLng], DISTRICT_ZOOM, {
          animate: true,
          duration: 2.5,
        });
      }
    }
  }, [selectedBranch, selectedDistrict, branches]);

  useEffect(() => {
    if (selectedBranch) {
      const marker = markerRefs.current[selectedBranch.name];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedBranch]);

  const mapMarkers = branches
    .filter((b) => !selectedDistrict || b.district === selectedDistrict)
    .map((branch) => { // Removed index, using branch.name as key for stability
      const isHighlighted = branch.name.includes('DAAS COMPUTERS');
      const isSelected = selectedBranch && branch.name === selectedBranch.name;

      const iconToUse = isSelected
        ? selectedBranchIcon
        : isHighlighted
        ? highlightIcon
        : branchIcon;

      return (
        <Marker
          key={branch.name} // Using branch name for key for consistency
          position={[branch.lat, branch.lng]}
          icon={iconToUse}
          ref={(ref) => {
            if (ref) markerRefs.current[branch.name] = ref;
          }}
          eventHandlers={{
            add: (e) => {
              // Add bounce animation only when a new selected branch marker is added/rendered
              if (isSelected) {
                const markerEl = e.target._icon;
                if (markerEl) {
                  markerEl.classList.add('bounce-animation');
                  setTimeout(() => markerEl.classList.remove('bounce-animation'), 1500);
                }
              }
            },
          }}
        >
          <Popup>
            <div className="font-roboto text-sm p-2.5 rounded-lg text-gray-600 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] max-w-[280px]">
              <div className="text-lg font-bold text-gray-800 mb-1.5">{branch.name}</div>
              <div className="mb-1 flex items-center">
                <span className="mr-1.5">📍</span> {branch.address}
              </div>
              <div className="mb-1 flex items-center">
                <span className="mr-1.5">📞</span> {branch.phone || 'Not available'}
              </div>
              {branch.email && (
                <div className="mb-1.5 flex items-center">
                  <span className="mr-1.5">✉️</span> {branch.email}
                </div>
              )}
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation ? `${userLocation[0]},${userLocation[1]}` : 'My+Location'}&destination=${branch.lat},${branch.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1.5 px-3 py-2 bg-blue-500 text-white rounded-md text-sm font-medium text-center transition-colors duration-300 cursor-pointer hover:bg-blue-600"
              >
                🧭 Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      );
    });

  return (
    <MapContainer
      center={center}
      zoom={INITIAL_MAP_ZOOM}
      scrollWheelZoom
      className="w-full h-screen rounded-lg shadow-custom-lg z-0" // Added z-0 here
      ref={mapRef}
    >
      <Recenter position={center} />
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="font-roboto text-sm font-bold text-blue-600">
              You are here 🚶
              {accuracy && accuracy > 100 && (
                <div className="text-xs text-gray-500 mt-1">Accuracy: ~{accuracy.toFixed(0)}m</div>
              )}
            </div>
          </Popup>
        </Marker>
      )}

      {mapMarkers}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          @keyframes pulse-glow {
            0% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.4); }
            50% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.8); }
            100% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.4); }
          }

          .nearest-branch-pulse {
            animation: pulse-glow 2s infinite ease-in-out;
          }

          .bounce-animation {
            animation: bounce 1.5s ease-in-out;
          }

          @media (max-width: 640px) {
            .leaflet-control-attribution {
              display: none;
            }
          }
        `}
      </style>
    </MapContainer>
  );
};

// Sidebar component with search, locate, and branch list
const Sidebar = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  branches,
  selectedBranch,
  onSelectBranch,
  onSearchAddress,
  onLocateMe,
  userLocation,
  locationError, // New prop for location error messages
  isLocating, // New prop for loading state
}) => {
  const [expandedDistrict, setExpandedDistrict] = useState(null);

  // Memoize branch filtering to prevent unnecessary re-renders
  const branchesInExpandedDistrict = useMemo(() => {
    return branches.filter((b) => b.district === expandedDistrict);
  }, [branches, expandedDistrict]);

  const handleDistrictClick = useCallback((district) => {
    setExpandedDistrict((prev) => (prev === district ? null : district));
    onSelectDistrict(district);
  }, [onSelectDistrict]);

  const nearestBranch = useMemo(() => {
    if (!userLocation) return null;
    let minDist = Infinity;
    let nearest = null;
    for (const branch of branches) {
      const dist = getDistance(
        userLocation[0],
        userLocation[1],
        branch.lat,
        branch.lng
      );
      if (dist < minDist) {
        minDist = dist;
        nearest = { ...branch, distance: dist };
      }
    }
    return nearest;
  }, [userLocation, branches]);

  const sortedDistricts = useMemo(() => {
    return [...districts].sort((a, b) => {
      // Prioritize "Vellore" and "Arani"
      if (a.toLowerCase() === 'vellore') return -1;
      if (b.toLowerCase() === 'vellore') return 1;
      if (a.toLowerCase() === 'arani') return -1;
      if (b.toLowerCase() === 'arani') return 1;
      return a.localeCompare(b);
    });
  }, [districts]);

  return (
    <div className="w-[300px] p-8 bg-gradient-to-br from-custom-blue-dark to-custom-blue-light border-r border-gray-300 h-full overflow-y-auto shadow-custom-sm rounded-r-lg z-10 relative"> {/* Added z-10 and relative */}
      <div className="text-xl font-semibold mb-6 text-center text-custom-gray uppercase tracking-wide">
        Our Showrooms
      </div>
      <SearchBox onSearch={onSearchAddress} />
      <button
        className={`w-full px-3 py-3 bg-white text-custom-blue-light border border-custom-blue-light rounded-full cursor-pointer text-sm font-medium mb-4 text-center transition-all duration-300 ${
          isLocating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-custom-blue-light hover:text-white hover:shadow-[0_2px-10px_rgba(0,0,0,0.15)]'
        }`}
        onClick={onLocateMe}
        disabled={isLocating}
      >
        {isLocating ? 'LOCATING...' : 'LOCATE YOURSELF'}
      </button>

      {locationError && (
        <p className="text-red-300 text-xs text-center mb-3">{locationError}</p>
      )}

      {nearestBranch && (
        <div className="nearest-section mt-2.5 mb-2.5 p-2.5 border-t border-gray-400">
          <div className="font-bold mb-1 text-custom-gray">Nearest Branch</div>
          <button
            className={`w-full text-left px-3 py-2 bg-yellow-100 text-gray-800 rounded-md transition-colors duration-200 hover:bg-yellow-200 ${
              selectedBranch?.name === nearestBranch.name ? 'border-2 border-yellow-500 nearest-branch-pulse' : ''
            }`}
            onClick={() => onSelectBranch(nearestBranch)}
            aria-pressed={selectedBranch?.name === nearestBranch.name}
          >
            {nearestBranch.name} ({nearestBranch.distance.toFixed(2)} km)
          </button>
        </div>
      )}

      <div className="district-list flex flex-col gap-3 mt-4">
        {sortedDistricts.map((d) => (
          <div key={d}>
            <motion.button
              className={`w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer text-sm font-medium text-left transition-all duration-300 text-gray-700 flex justify-between items-center ${
                selectedDistrict === d
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-emerald-500 shadow-[0_2px-10px_rgba(0,0,0,0.15)]'
                  : 'hover:bg-gray-200 hover:shadow-[0_2px-8px_rgba(0,0,0,0.1)]'
              }`}
              onClick={() => handleDistrictClick(d)}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={selectedDistrict === d ? { opacity: 1, scale: 1.05, boxShadow: '0 0 15px rgba(16, 185, 129, 0.7)' } : { opacity: 0.8, scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.02 }}
              aria-expanded={expandedDistrict === d}
              aria-controls={`branch-list-${d.replace(/\s+/g, '-')}`}
            >
              {d.toUpperCase()}
              <span>{expandedDistrict === d ? '▲' : '▼'}</span>
            </motion.button>
            {expandedDistrict === d && (
              <motion.div
                id={`branch-list-${d.replace(/\s+/g, '-')}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} // Need to use AnimatePresence for exit animations if unmounting
                transition={{ duration: 0.3 }}
              >
                <BranchList branches={branchesInExpandedDistrict} selectedBranch={selectedBranch} onSelectBranch={onSelectBranch} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Showroom application component
const Showroom = () => {
  const districts = useMemo(() => {
    const set = new Set(branches.map((b) => b.district));
    return Array.from(set);
  }, []);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [locationError, setLocationError] = useState(null); // State for location errors
  const [isLocating, setIsLocating] = useState(false); // State for loading during geolocation

  const filteredBranches = useMemo(() => {
    if (!selectedDistrict) return branches;
    return branches.filter((b) => b.district === selectedDistrict);
  }, [selectedDistrict]);

  const handleSearchAddress = useCallback(async (address) => {
    const normalizedAddress = address.trim().toLowerCase();
    setLocationError(null); // Clear previous errors
    setSelectedBranch(null); // Deselect any branch
    setUserLocation(null); // Clear user location
    setAccuracy(null);

    // Handle specific district searches
    if (normalizedAddress === 'vellore') {
      setSelectedDistrict('Vellore');
      return;
    } else if (normalizedAddress === 'arani') {
      setSelectedDistrict('Arani');
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setUserLocation([parseFloat(lat), parseFloat(lon)]);
        setSelectedDistrict(null); // If searching for specific address, clear district selection
      } else {
        setLocationError('Address not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      setLocationError('Error finding address. Please check your connection or try again.');
    }
  }, []); // Empty dependency array means this function is created once

  const handleLocateMe = useCallback(async () => {
    setIsLocating(true);
    setLocationError(null);
    setSelectedBranch(null); // Clear selected branch when locating user
    setSelectedDistrict(null); // Clear selected district when locating user

    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setUserLocation([latitude, longitude]);
          setAccuracy(accuracy);
          setIsLocating(false);

          if (accuracy > 500) { // More precise threshold for warning
            
            
  toast.warn(
    'Your location was detected, but it might not be very accurate. For better results, ensure good GPS signal or Wi-Fi.',
   
  );


          }
        },
        async (error) => {
          console.error('Geolocation error:', error.message);
          setIsLocating(false);
          let errorMessage = 'Unable to determine your precise location.';

          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Location access denied. Please enable location services in your browser settings.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = 'Location information is unavailable.';
          } else if (error.code === error.TIMEOUT) {
            errorMessage = 'The request to get user location timed out.';
          }

          setLocationError(errorMessage + ' Attempting IP-based fallback...');

          // Fallback to IP-based location if geolocation fails
          try {
            // NOTE: Replace 'YOUR_IPINFO_API_TOKEN' with your actual token from ipinfo.io
            const ipRes = await fetch('https://ipinfo.io/json?token=YOUR_IPINFO_API_TOKEN');
            if (!ipRes.ok) throw new Error(`IPinfo HTTP error! status: ${ipRes.status}`);
            const ipData = await ipRes.json();

            if (ipData.loc) {
              const [lat, lng] = ipData.loc.split(',').map(Number);
              setUserLocation([lat, lng]);
              setAccuracy(5000); // IP-based location is less accurate
              setLocationError('Location estimated using IP address. Accuracy may vary.');
            } else {
              setLocationError("Couldn't determine your location via IP. Please try again.");
            }
          } catch (ipError) {
            console.error('IP-based location fallback error:', ipError);
            setLocationError('Unable to detect your location via IP. Please try again or search manually.');
          }
        },
        geolocationOptions
      );
    } else {
      setIsLocating(false);
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []); // Empty dependency array for useCallback

  const handleSelectBranch = useCallback((branch) => {
    setSelectedBranch(branch);
    setUserLocation(null); // Clear user location when a branch is selected
    setAccuracy(null);
  }, []); // Empty dependency array for useCallback

  return (
    <div className="m-0 p-0 box-border font-roboto h-screen overflow-hidden text-gray-800 flex justify-center items-center bg-gray-100">
      <div className="w-[95%] max-w-[1200px] h-[90vh] p-5 bg-[rgba(250,248,248,0.95)] rounded-2xl shadow-custom-lg flex flex-col gap-5 relative z-10"> {/* Added relative z-10 here */}
        <motion.h1
          className="text-4xl font-bold text-white text-center p-6 bg-gradient-to-br from-custom-blue-dark to-custom-blue-light rounded-2xl shadow-custom-md relative overflow-hidden z-20" // Title z-index increased to 20
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
        >
          <span className="absolute top-0 left-[-75%] h-full w-[50%] bg-[linear-gradient(120deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0.2)_100%)] -skew-x-20 animate-shimmer z-0" />
          <span className="relative z-20">Find Your Nearest Daas Computer Store</span>
        </motion.h1>

        <div className="flex-1 flex flex-col md:flex-row gap-5 overflow-hidden">
          <div className="w-full md:w-[340px] bg-gradient-to-br from-custom-blue-dark to-custom-blue-light rounded-2xl p-4 overflow-hidden h-full border border-gray-300 shadow-custom-sm text-custom-gray flex flex-col items-center z-10 relative"> {/* Sidebar z-index set to 10 */}
            <Sidebar
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              branches={branches} // Pass all branches to sidebar for nearest branch calculation
              selectedBranch={selectedBranch}
              onSelectBranch={handleSelectBranch}
              onSearchAddress={handleSearchAddress}
              onLocateMe={handleLocateMe}
              userLocation={userLocation}
              locationError={locationError}
              isLocating={isLocating}
            />
          </div>

          <BranchMap
            branches={filteredBranches} // Pass filtered branches to map
            userLocation={userLocation}
            selectedDistrict={selectedDistrict}
            selectedBranch={selectedBranch}
            accuracy={accuracy}
          />
        </div>
      </div>

      <style>
        {`
          /* Keyframes for shimmer animation on title */
          @keyframes shimmer {
            0% {
              left: -75%;
            }
            100% {
              left: 125%;
            }
          }

          /* Keyframes for pulse glow on nearest branch */
          @keyframes pulse-glow {
            0% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.4); } /* Gold color with transparency */
            50% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.8); }
            100% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.4); }
          }

          .nearest-branch-pulse {
            animation: pulse-glow 2s infinite ease-in-out;
          }

          /* Keyframes for bounce animation on selected marker */
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          .bounce-animation {
            animation: bounce 1.5s ease-in-out;
          }

          /* Responsive adjustments for smaller screens */
          @media (max-width: 768px) { /* Adjusted breakpoint for md: from Tailwind */
            .flex-col {
              flex-direction: column;
            }

            .md\\:w-\\[340px\\] { /* Target the sidebar width specifically */
              width: 100%;
              min-height: 350px; /* Give sidebar some minimum height on small screens */
            }

            .md\\:flex-row { /* Reset flex direction for main content */
              flex-direction: column;
            }

            .h-\\[90vh\\] { /* Adjust overall container height for small screens */
              height: auto;
              min-height: 90vh;
            }

            .leaflet-container { /* Ensure map takes available height */
              height: 400px; /* Fixed height for map on small screens */
            }
            .leaflet-control-attribution {
              display: none; /* Hide attribution on very small screens */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Showroom;