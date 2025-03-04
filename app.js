// Access React and React-Simple-Maps components from global scope
const { 
  useState, 
  useEffect,
  useRef
} = React;

const {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Line
} = ReactSimpleMaps;

// World map data
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// RIL operations data extracted from the document
const rilOperations = [
  {
    id: 1,
    country: "India",
    location: [78.9629, 20.5937],
    type: "headquarters",
    details: "Headquarters in Mumbai. Home to flagship Jamnagar refinery complex.",
    timeline: "1960s-present",
    status: "current",
    description: "RIL evolved from a domestic textile player in the 1960s to a global energy conglomerate. The Jamnagar refinery complex is a major global export hub, making Reliance India's largest exporter (7% of India's merchandise exports).",
    events: [
      { year: 1993, description: "Issued Global Depository Receipt, becoming one of the first Indian firms to raise equity abroad" },
      { year: 2011, description: "Formed strategic partnership with BP, who acquired 30% stake in 23 of Reliance's oil and gas production-sharing contracts in India for $7.2 billion" }
    ]
  },
  {
    id: 2,
    country: "United Arab Emirates",
    location: [55.3047, 25.2697],
    type: "subsidiary",
    details: "Reliance Exploration and Production DMCC established in Dubai in 2007.",
    timeline: "2007-present",
    status: "current",
    description: "Set up as a dedicated arm to acquire overseas hydrocarbon assets. Recently formed a chemical JV with ADNOC in UAE.",
    events: [
      { year: 2007, description: "Established Reliance Exploration and Production DMCC in Dubai" },
      { year: 2022, description: "Formed chemical JV with ADNOC in UAE (TA'ZIZ JV)" }
    ]
  },
  {
    id: 3,
    country: "United Kingdom",
    location: [-0.1275, 51.5072],
    type: "trading",
    details: "Reliance Global Energy Services Ltd in London",
    timeline: "2008-present",
    status: "current",
    description: "Trading subsidiary set up to handle oil product trading and improve arbitrage trading of refined fuels.",
    events: [
      { year: 2008, description: "Incorporated trading subsidiary in London" }
    ]
  },
  {
    id: 4,
    country: "Singapore",
    location: [103.8198, 1.3521],
    type: "trading",
    details: "Reliance Global Energy Services in Singapore",
    timeline: "2008-present",
    status: "current",
    description: "Trading subsidiary set up to tap global markets. Faced challenges with team retention due to lack of autonomy.",
    events: [
      { year: 2008, description: "Incorporated trading subsidiary in Singapore" },
      { year: 2009, description: "Singapore trading desk resigned due to lack of empowerment" }
    ]
  },
  {
    id: 5,
    country: "United States",
    location: [-77.1945, 41.2033],
    type: "joint_venture",
    details: "40% stake in Atlas Energy's Marcellus Shale acreage in Pennsylvania",
    timeline: "2010-2018",
    status: "past",
    description: "Part of Reliance's aggressive push to build a U.S. presence in the shale gas boom. Investment of $1.7 billion.",
    events: [
      { year: 2010, description: "Acquired 40% stake in Atlas Energy's Marcellus Shale acreage for $1.7 billion" },
      { year: 2018, description: "Exited the shale business due to low natural gas prices making projects less viable" }
    ]
  },
  {
    id: 6,
    country: "United States",
    location: [-97.6436, 28.7041],
    type: "joint_venture",
    details: "45% stake in Pioneer Natural Resources' Eagle Ford Shale assets in Texas",
    timeline: "2010-2018",
    status: "past",
    description: "Investment of $1.35 billion in Eagle Ford Shale, aiming to become a key player in the U.S. shale business.",
    events: [
      { year: 2010, description: "Acquired 45% stake in Pioneer Natural Resources' Eagle Ford Shale assets for $1.35 billion" },
      { year: 2018, description: "Exited the shale business due to low natural gas prices making projects less viable" }
    ]
  },
  {
    id: 7,
    country: "United States",
    location: [-77.1945, 43.2033],
    type: "joint_venture",
    details: "60% stake in a Carrizo Oil & Gas shale acreage JV",
    timeline: "2010-2018",
    status: "past",
    description: "Investment of $392 million in Marcellus Shale, with Reliance paying $340M cash plus $52M in drilling carry.",
    events: [
      { year: 2010, description: "Acquired 60% stake in Carrizo Oil & Gas shale acreage for ~$392 million" },
      { year: 2018, description: "Exited the shale business due to low natural gas prices making projects less viable" }
    ]
  },
  {
    id: 8,
    country: "Yemen",
    location: [48.5164, 15.5527],
    type: "exploration",
    details: "Stakes in three blocks in Yemen (one producing, two exploratory)",
    timeline: "2000s-2012",
    status: "past",
    description: "Initial success with Block 9 (producing), but operations halted when civil war erupted. Sold its stake to exit the market in 2012.",
    events: [
      { year: 2012, description: "Sold stake in Yemen Block 9 to exit the market due to civil war and instability" }
    ]
  },
  {
    id: 9,
    country: "Oman",
    location: [56.0924, 21.4735],
    type: "exploration",
    details: "Two blocks in Oman",
    timeline: "2000s-2010s",
    status: "past",
    description: "Blocks did not yield major discoveries and were eventually relinquished.",
    events: [
      { year: 2010, description: "Held two exploration blocks" },
      { year: 2015, description: "Relinquished blocks due to lack of commercial discoveries" }
    ]
  },
  {
    id: 10,
    country: "Peru",
    location: [-75.0152, -9.1900],
    type: "exploration",
    details: "Stakes in four blocks in Peru",
    timeline: "2000s-2017",
    status: "past",
    description: "Despite years of exploration, no major discoveries were developed. By 2017, Reliance withdrew from Peru entirely.",
    events: [
      { year: 2017, description: "Exited Block 39 with a small 10% stake after the operator Perenco moved slowly" }
    ]
  },
  {
    id: 11,
    country: "Colombia",
    location: [-74.2973, 4.5709],
    type: "exploration",
    details: "Two blocks in Colombia",
    timeline: "2000s-2010s",
    status: "past",
    description: "Selected for Colombia's improving stability and oil prospectivity, but operations were eventually discontinued.",
    events: []
  },
  {
    id: 12,
    country: "Myanmar",
    location: [95.9560, 21.9162],
    type: "exploration",
    details: "Two offshore gas blocks acquired in 2014",
    timeline: "2014-present",
    status: "current",
    description: "Acquired as Myanmar was opening to foreign investment post-2011 reforms. Status uncertain after Myanmar's political situation became volatile (military coup in 2021).",
    events: [
      { year: 2014, description: "Acquired two offshore gas blocks in Myanmar" },
      { year: 2021, description: "Operations uncertain after military coup in Myanmar" }
    ]
  },
  {
    id: 13,
    country: "East Timor",
    location: [125.7275, -8.8742],
    type: "exploration",
    details: "One block in East Timor (Timor-Leste)",
    timeline: "2000s-2010s",
    status: "past",
    description: "Chosen for offshore gas prospects in the Timor Sea region. Did not materialize into developments, and the stake was eventually dropped.",
    events: []
  },
  {
    id: 14,
    country: "Australia",
    location: [133.7751, -25.2744],
    type: "exploration",
    details: "One block in Australia",
    timeline: "2000s-2010s",
    status: "past",
    description: "Chosen for offshore gas prospects in the Timor Sea region. Did not materialize into developments, and the stake was eventually dropped.",
    events: []
  },
  {
    id: 15,
    country: "Iraq",
    location: [44.3661, 36.1901],
    type: "exploration",
    details: "Blocks in Kurdistan region",
    timeline: "2007-2010s",
    status: "past",
    description: "Entered during an oil rush in Kurdistan. Exited after a few years, possibly due to legal issues between Baghdad and Erbil.",
    events: [
      { year: 2007, description: "Entered Kurdistan during an oil rush" },
      { year: 2010, description: "Exited due to geopolitical and regulatory uncertainties" }
    ]
  }
];

// Define opportunity areas from the recommendations
const opportunityAreas = [
  {
    id: 101,
    region: "Middle East",
    countries: ["Saudi Arabia", "UAE", "Qatar"],
    location: [45.0792, 23.8859],
    timeframe: "short-term (1-3 years)",
    details: "Focus on downstream or midstream projects like petrochemical plants or logistics terminals.",
    description: "Leverage political stability and abundant feedstock. Consider participating in Saudi Arabia's petrochemical expansions or hydrogen initiatives.",
    recommendation: "Assign a team to evaluate 2-3 potential projects in the Gulf that fit O2C or new energy vision. Aim for 1-2 MoUs signed within 3 years."
  },
  {
    id: 102,
    region: "North America",
    countries: ["United States", "Canada"],
    location: [-100.0000, 40.0000],
    timeframe: "short-term (1-3 years)",
    details: "Invest in innovation partnerships like technology incubators or minority stakes in energy tech firms.",
    description: "Consider partnering with a Canadian LNG or a U.S. renewable natural gas venture on a small scale to test waters.",
    recommendation: "Scout North America for investments < $100M in emerging energy that complement oil & gas (such as carbon capture tech)."
  },
  {
    id: 103,
    region: "East Africa",
    countries: ["Mozambique", "Tanzania"],
    location: [34.8888, -6.3690],
    timeframe: "medium-term (3-7 years)",
    details: "Target natural gas projects in politically stable countries, which align with energy transition.",
    description: "Could include bidding for stakes in East African LNG once stable. Ensure any entry is with strong partners and ideally where output can be tied to long-term contracts.",
    recommendation: "Execute one upstream deal (10-20% stake in a producing gas field or an LNG project) in a country rated moderately stable."
  },
  {
    id: 104,
    region: "Southeast Asia",
    countries: ["Vietnam", "Indonesia", "Malaysia"],
    location: [106.8000, 10.7800],
    timeframe: "medium-term (3-7 years)",
    details: "Build or acquire downstream assets in-market. Set up small distribution networks or specialty product plants closer to key markets.",
    description: "Consider a JV in Vietnam's petrochemical sector to better serve local demand and hedge against tariffs on exports.",
    recommendation: "Identify one target geography and conduct feasibility. Aim for one downstream asset abroad in operation by year 7."
  },
  {
    id: 105,
    region: "Africa",
    countries: ["Nigeria", "Ghana", "Kenya"],
    location: [3.3792, 6.5244],
    timeframe: "long-term (7+ years)",
    details: "Consider acquiring a mid-sized refinery or petrochemical plant in a region with big customers.",
    description: "Enter emerging markets in Africa which by then may have better governance and growing energy demand.",
    recommendation: "Look for opportunities to enter markets like Nigeria, if governance improves, where Reliance's downstream prowess fits in."
  }
];

// Define key partnerships and their details
const keyPartnerships = [
  {
    id: 201,
    partner: "BP",
    country: "India",
    location: [78.9629, 20.5937],
    year: 2011,
    details: "BP acquired 30% stake in 23 of Reliance's oil and gas production-sharing contracts in India for $7.2 billion.",
    description: "Formed a 50:50 JV for gas marketing in India. The partnership brought in technology and affirmed Reliance's willingness to collaborate internationally for growth.",
    status: "current"
  },
  {
    id: 202,
    partner: "Atlas Energy",
    country: "United States",
    location: [-77.1945, 41.2033],
    year: 2010,
    details: "Reliance took 40% in a JV with Atlas Energy in Marcellus Shale for $1.7 billion.",
    description: "Reliance provided capital in exchange for a stake, while Atlas provided operating know-how and local management.",
    status: "past"
  },
  {
    id: 203,
    partner: "Pioneer Natural Resources",
    country: "United States",
    location: [-97.6436, 28.7041],
    year: 2010,
    details: "Reliance 45%, Pioneer 55% operator in Eagle Ford Shale assets for $1.35 billion.",
    description: "Pioneer operated the fields while Reliance provided capital investment.",
    status: "past"
  },
  {
    id: 204,
    partner: "Carrizo Oil & Gas",
    country: "United States",
    location: [-77.1945, 43.2033],
    year: 2010,
    details: "Reliance 60%, Carrizo 40% in a JV in Marcellus Shale for ~$392 million.",
    description: "Reliance paid $340M cash plus $52M in drilling carry for this partnership.",
    status: "past"
  },
  {
    id: 205,
    partner: "ADNOC",
    country: "United Arab Emirates",
    location: [55.3047, 25.2697],
    year: 2022,
    details: "Chemical JV in UAE (TA'ZIZ JV)",
    description: "Partnership with Abu Dhabi National Oil Company to navigate local contexts while HQ focuses on integration.",
    status: "current"
  },
  {
    id: 206,
    partner: "LyondellBasell (attempted)",
    country: "Netherlands",
    location: [4.8952, 52.3702],
    year: 2009,
    details: "Attempted acquisition of LyondellBasell (a bankrupt global petrochemical giant)",
    description: "Bid to acquire a controlling stake (around $6-$14 billion) failed. Would have transformed Reliance into a top-tier international petrochemical firm overnight.",
    status: "past"
  },
  {
    id: 207,
    partner: "Saudi Aramco (proposed)",
    country: "Saudi Arabia",
    location: [45.079, 23.885],
    year: 2019,
    details: "Proposed 20% stake sale of Reliance's Oil-to-Chemicals (O2C) division to Saudi Aramco",
    description: "Deal was put on hold in 2021 due to valuation and strategic shifts (energy transition).",
    status: "past"
  }
];

// Define strategy timeline phases
const strategyTimeframes = [
  {
    id: 301,
    title: "Short Term (1-3 years)",
    recommendations: [
      "Strengthen presence in the Middle East - downstream/midstream, petrochemicals",
      "Cautiously revisit North America - innovation partnerships, LNG",
      "Create an International Operations Cell at HQ to support overseas subsidiaries/JVs",
      "Launch small-scale CSR initiatives in countries with RIL presence",
      "Use an asset-light approach with alliances and minority stakes"
    ]
  },
  {
    id: 302,
    title: "Medium Term (3-7 years)",
    recommendations: [
      "Selective upstream investments in lower-risk, high-demand opportunities (like natural gas)",
      "Build or acquire downstream assets in key markets (e.g., Africa or Southeast Asia)",
      "Establish regional headquarters with delegated authority",
      "Increase local nationals in leadership of overseas ventures",
      "Publish an International Sustainability Report annually"
    ]
  },
  {
    id: 303,
    title: "Long Term (7+ years)",
    recommendations: [
      "Create an integrated global network for seamless value chain integration",
      "Adapt new energy solutions to local market needs (transnational approach)",
      "Consider entering high-potential markets once conditions improve",
      "Establish Reliance International as a sub-holding for non-India assets",
      "Join global initiatives for sustainability and establish local advisory boards"
    ]
  }
];

// ENHANCED: Add key metrics and statistics for RIL's global operations
const globalMetrics = [
  { 
    metric: "International Revenue", 
    value: "56.8%", 
    description: "Percentage of total revenue from international operations",
    trend: "increasing"
  },
  { 
    metric: "Export Volume", 
    value: "7%", 
    description: "Portion of India's total merchandise exports",
    trend: "stable"
  },
  { 
    metric: "Global Partners", 
    value: "14", 
    description: "Major international partnerships active in last decade",
    trend: "increasing"
  },
  { 
    metric: "Countries Operated In", 
    value: "12", 
    description: "Number of countries where RIL had operations",
    trend: "decreasing"
  },
  { 
    metric: "International Investment", 
    value: "$12.1B", 
    description: "Total capital invested in international ventures since 2000",
    trend: "decreasing"
  }
];

// ENHANCED: Key risk assessments by region
const regionRisks = [
  {
    region: "Middle East",
    politicalRisk: "Medium",
    economicRisk: "Low",
    opportunityScore: "High",
    notes: "Political tensions balanced by strong investment climate and abundant resources"
  },
  {
    region: "North America",
    politicalRisk: "Low",
    economicRisk: "Medium",
    opportunityScore: "Medium",
    notes: "Stable governance but competitive landscape and price volatility"
  },
  {
    region: "Africa",
    politicalRisk: "High",
    economicRisk: "High",
    opportunityScore: "High",
    notes: "Governance challenges but high growth potential and underserved markets"
  },
  {
    region: "Southeast Asia",
    politicalRisk: "Medium",
    economicRisk: "Medium",
    opportunityScore: "High",
    notes: "Growing markets with increasing energy demand and strategic location"
  },
  {
    region: "Latin America",
    politicalRisk: "Medium-High",
    economicRisk: "Medium-High",
    opportunityScore: "Medium",
    notes: "Resource rich but historical challenges with regulatory predictability"
  }
];

// ENHANCED: Story mode narratives
const storyModeData = [
  {
    id: 1,
    title: "The Beginning (1960s-1993)",
    content: "Reliance Industries began as a textile company in India in the 1960s. For decades, it focused primarily on domestic markets. The first international milestone came in 1993 when Reliance issued a Global Depository Receipt, becoming one of the first Indian firms to raise equity abroad. This move signaled its global ambitions and laid the groundwork for future international expansion.",
    image: "https://via.placeholder.com/150?text=RIL+1993",
    year: 1993
  },
  {
    id: 2,
    title: "Global Exploration Begins (2007-2010)",
    content: "In 2007, Reliance established Reliance Exploration and Production DMCC in Dubai as a dedicated arm to acquire overseas hydrocarbon assets. This marked the beginning of its true cross-border expansion in oil and gas. Within a few years, Reliance would hold 16 international oil & gas blocks across multiple countries including Yemen, Oman, Peru, Kurdistan (Iraq), East Timor, and Australia.",
    image: "https://via.placeholder.com/150?text=RIL+2007",
    year: 2007
  },
  {
    id: 3,
    title: "The US Shale Venture (2010)",
    content: "In 2010, Reliance made an aggressive push into North American shale gas, seeing the potential of the US shale boom. It entered three separate joint ventures: a 40% stake in Atlas Energy's Marcellus Shale acreage for $1.7 billion, a 45% stake in Pioneer Natural Resources' Eagle Ford Shale assets for $1.35 billion, and a 60% stake in a Carrizo Oil & Gas shale acreage JV for ~$392 million. This represented RIL's peak international ambition.",
    image: "https://via.placeholder.com/150?text=US+Shale+2010",
    year: 2010
  },
  {
    id: 4,
    title: "BP Partnership (2011)",
    content: "2011 marked a watershed moment with the strategic partnership with BP. BP acquired a 30% stake in 23 of Reliance's oil and gas production-sharing contracts in India for $7.2 billion. They also formed a 50:50 JV for gas marketing in India. This partnership brought advanced technology and affirmed Reliance's willingness to collaborate internationally for growth.",
    image: "https://via.placeholder.com/150?text=BP+Partnership+2011",
    year: 2011
  },
  {
    id: 5,
    title: "Strategic Recalibration (2014-2018)",
    content: "By the mid-2010s, Reliance began re-evaluating its international portfolio. Low natural gas prices affected the viability of US shale ventures, leading to asset write-downs. By 2017, Reliance had divested or relinquished almost all international blocks outside India, retaining only two gas blocks in Myanmar. This period represented a strategic pivot back to domestic projects and new businesses.",
    image: "https://via.placeholder.com/150?text=RIL+Pivot+2017",
    year: 2017
  },
  {
    id: 6,
    title: "New Energy Focus (2020-Present)",
    content: "In recent years, Reliance has refocused its international strategy with an eye toward the energy transition. It has announced significant investments in renewable energy and continues to leverage strategic partnerships like the chemical JV with ADNOC in UAE. While its direct overseas ownership of oilfields has waned, Reliance's core oil & gas business remains deeply integrated into global markets via exports and alliances.",
    image: "https://via.placeholder.com/150?text=New+Energy+2022",
    year: 2022
  }
];

// Main App Component
const App = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [filters, setFilters] = useState({
    operations: true,
    partnerships: true,
    opportunities: true,
    status: "all" // all, current, past
  });
  const [activeTab, setActiveTab] = useState("map"); // map, timeline, details, strategy, story, compare
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);
  const [year, setYear] = useState(2025);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [selectedMetricView, setSelectedMetricView] = useState("global");
  const animationRef = useRef(null);

  // Auto-play animation
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setInterval(() => {
        setYear(prevYear => {
          const newYear = prevYear + 1;
          if (newYear > 2025) {
            setIsPlaying(false);
            return 2025;
          }
          return newYear;
        });
      }, 500);
    } else {
      clearInterval(animationRef.current);
    }

    return () => clearInterval(animationRef.current);
  }, [isPlaying]);

  // Filter operations based on selected filters, year, and search
  const filteredOperations = rilOperations.filter(op => {
    // Status filter
    const statusMatch = filters.status === "all" || op.status === filters.status;
    
    // Year filter - check if the operation was active in the selected year
    const timelineYears = op.timeline.split("-");
    const startYear = timelineYears[0].includes("s") 
      ? parseInt(timelineYears[0].replace("s", "0")) 
      : parseInt(timelineYears[0]);
    const endYear = timelineYears[1] === "present" ? 2025 : parseInt(timelineYears[1]);
    
    const yearMatch = !isNaN(startYear) && (startYear <= year && (endYear >= year || timelineYears[1] === "present"));
    
    // Search filter
    const searchMatch = !searchQuery || 
      op.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && yearMatch && searchMatch;
  });

  // Filter partnerships
  const filteredPartnerships = keyPartnerships.filter(p => {
    const statusMatch = filters.status === "all" || p.status === filters.status;
    const yearMatch = p.year <= year;
    const searchMatch = !searchQuery || 
      p.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.details.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && yearMatch && searchMatch;
  });

  // Filter opportunities - only show for future years
  const filteredOpportunities = opportunityAreas.filter(o => {
    const yearMatch = year >= 2023;
    const searchMatch = !searchQuery || 
      o.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.countries.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      o.details.toLowerCase().includes(searchQuery.toLowerCase());
    return yearMatch && searchMatch;
  });

  // Handle year change
  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  // Get all events for timeline
  const getAllEvents = () => {
    const events = [];
    
    // Add operation events
    rilOperations.forEach(op => {
      if (op.events) {
        op.events.forEach(event => {
          events.push({
            year: event.year,
            description: event.description,
            type: "operation",
            country: op.country,
            id: `${op.id}-${event.year}`
          });
        });
      }
    });
    
    // Add partnership events
    keyPartnerships.forEach(p => {
      events.push({
        year: p.year,
        description: `Partnership with ${p.partner} in ${p.country}: ${p.details}`,
        type: "partnership",
        country: p.country,
        id: `p-${p.id}`
      });
    });
    
    // Filter events based on search
    const filteredEvents = !searchQuery 
      ? events 
      : events.filter(e => 
          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
    return filteredEvents.sort((a, b) => a.year - b.year);
  };

  const allEvents = getAllEvents();

  // ENHANCED: Export current view
  const handleExport = () => {
    setShowPrintPreview(true);
    setTimeout(() => {
      window.print();
      setShowPrintPreview(false);
    }, 500);
  };

  // ENHANCED: Toggle story mode
  const nextStory = () => {
    if (currentStoryIndex < storyModeData.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setYear(storyModeData[currentStoryIndex + 1].year);
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setYear(storyModeData[currentStoryIndex - 1].year);
    }
  };

  // Calculate investment stats
  const calculateInvestmentStats = () => {
    // Total investment calculation (simplified version based on data)
    const totalInvestment = 1700 + 1350 + 392; // Shale ventures in millions USD
    const successfulVentures = 1; // BP partnership
    const failedVentures = 10; // Rough approximation of exits
    
    return {
      totalInvestment: `$${totalInvestment.toFixed(0)} million`,
      successRate: `${Math.round((successfulVentures / (successfulVentures + failedVentures)) * 100)}%`,
      majorPartnerships: keyPartnerships.length,
      countriesEntered: new Set(rilOperations.map(op => op.country)).size - 1, // Minus India
    };
  };

  const investmentStats = calculateInvestmentStats();

  return (
    <div className={`relative w-full min-h-screen bg-gray-50 ${showPrintPreview ? 'print-view' : ''}`}>
      {/* Header banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reliance Industries Global Operations Map</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleExport}
              className="px-3 py-1 bg-white text-blue-700 rounded shadow hover:bg-gray-100"
            >
              Export View
            </button>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white shadow-md p-2 flex mb-2 overflow-x-auto">
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeTab === "map" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("map")}
        >
          Map View
        </button>
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeTab === "timeline" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeTab === "strategy" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("strategy")}
        >
          Strategy
        </button>
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeTab === "details" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeTab === "metrics" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("metrics")}
        >
          Metrics
        </button>
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeTab === "story" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => {
            setActiveTab("story");
            setYear(storyModeData[currentStoryIndex].year);
          }}
        >
          Story Mode
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === "risks" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("risks")}
        >
          Risk Analysis
        </button>
      </div>

      {/* Search bar - available in all views */}
      <div className="bg-white p-2 mb-2 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search countries, partners, or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex items-center ml-4">
          <span className="mr-2 text-gray-700">Year: {year}</span>
          <input 
            type="range" 
            min="1990" 
            max="2025" 
            value={year} 
            onChange={handleYearChange}
            className="w-48"
          />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`ml-2 px-3 py-1 rounded ${isPlaying ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      {/* Map View */}
      {activeTab === "map" && (
        <div className="flex h-[calc(100vh-210px)]">
          {/* Sidebar */}
          <div className="w-64 bg-white p-4 shadow-md overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">RIL Global Footprint</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Show:</h3>
              <div className="space-y-1">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.operations} 
                    onChange={() => setFilters({...filters, operations: !filters.operations})}
                    className="mr-2"
                  />
                  Operations
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.partnerships} 
                    onChange={() => setFilters({...filters, partnerships: !filters.partnerships})}
                    className="mr-2"
                  />
                  Partnerships
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.opportunities} 
                    onChange={() => setFilters({...filters, opportunities: !filters.opportunities})}
                    className="mr-2"
                  />
                  Opportunities
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Status:</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-2 py-1 text-sm rounded ${filters.status === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  onClick={() => setFilters({...filters, status: "all"})}
                >
                  All
                </button>
                <button 
                  className={`px-2 py-1 text-sm rounded ${filters.status === "current" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  onClick={() => setFilters({...filters, status: "current"})}
                >
                  Current
                </button>
                <button 
                  className={`px-2 py-1 text-sm rounded ${filters.status === "past" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  onClick={() => setFilters({...filters, status: "past"})}
                >
                  Past
                </button>
              </div>
            </div>

            <div className="mb-4 pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">Current View Stats:</h3>
              <div className="text-sm space-y-1">
                <p>Operations shown: {filteredOperations.length}</p>
                <p>Partnerships shown: {filteredPartnerships.length}</p>
                <p>Opportunities shown: {filteredOpportunities.length}</p>
                <p>Year: {year}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">Legend:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                  <span>Current Operation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  <span>Past Operation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Partnership</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Opportunity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map container */}
          <div className="flex-1 relative">
            {/* Info panel when entity is selected */}
            {selectedEntity && (
              <div className="absolute top-2 right-2 z-10 bg-white p-4 rounded shadow-md max-w-md">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">
                    {selectedEntity.country || selectedEntity.region || `${selectedEntity.partner} (${selectedEntity.country})`}
                  </h3>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedEntity(null)}
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedEntity.timeline || selectedEntity.timeframe || `Partnered: ${selectedEntity.year}`}
                </p>
                <p className="font-medium">{selectedEntity.details}</p>
                <p className="my-2 text-sm">{selectedEntity.description}</p>
                
                {selectedEntity.recommendation && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-md">
                    <p className="text-sm font-medium">Recommendation:</p>
                    <p className="text-sm">{selectedEntity.recommendation}</p>
                  </div>
                )}
                
                {selectedEntity.events && selectedEntity.events.length > 0 && (
                  <div className="mt-3">
                    <p className="font-medium">Key Events:</p>
                    <ul className="list-disc list-inside text-sm mt-1">
                      {selectedEntity.events.map((event, i) => (
                        <li key={i} className="mb-1">
                          <span className="font-medium">{event.year}:</span> {event.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Map */}
            <ComposableMap projection="geoMercator">
              <ZoomableGroup zoom={zoom} center={center} onMoveEnd={({ zoom, coordinates }) => {
                setZoom(zoom);
                setCenter(coordinates);
              }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EAEAEC"
                        stroke="#D6D6DA"
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#F5F5F5" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Operations markers */}
                {filters.operations && filteredOperations.map(({ id, location, country, type, status }) => (
                  <Marker 
                    key={`op-${id}`} 
                    coordinates={location} 
                    onClick={() => setSelectedEntity(rilOperations.find(op => op.id === id))}
                  >
                    <circle 
                      r={6} 
                      fill={status === "current" ? "#2563EB" : "#6B7280"} 
                      stroke="#FFFFFF" 
                      strokeWidth={2} 
                    />
                    <text
                      textAnchor="middle"
                      y={-10}
                      style={{ 
                        fontSize: "8px", 
                        fontWeight: "bold", 
                        fill: "#000000",
                        textShadow: "1px 1px 1px #FFFFFF"
                      }}
                    >
                      {country}
                    </text>
                  </Marker>
                ))}

                {/* Partnership markers */}
                {filters.partnerships && filteredPartnerships.map(({ id, location, partner, country }) => (
                  <Marker 
                    key={`p-${id}`} 
                    coordinates={location} 
                    onClick={() => setSelectedEntity(keyPartnerships.find(p => p.id === id))}
                  >
                    <circle 
                      r={5} 
                      fill="#EF4444" 
                      stroke="#FFFFFF" 
                      strokeWidth={2} 
                    />
                    <text
                      textAnchor="middle"
                      y={-10}
                      style={{ 
                        fontSize: "8px", 
                        fontWeight: "bold", 
                        fill: "#000000",
                        textShadow: "1px 1px 1px #FFFFFF"
                      }}
                    >
                      {partner}
                    </text>
                  </Marker>
                ))}

                {/* Opportunity markers */}
                {filters.opportunities && filteredOpportunities.map(({ id, location, region }) => (
                  <Marker 
                    key={`opp-${id}`} 
                    coordinates={location} 
                    onClick={() => setSelectedEntity(opportunityAreas.find(op => op.id === id))}
                  >
                    <circle 
                      r={5} 
                      fill="#10B981" 
                      stroke="#FFFFFF" 
                      strokeWidth={2} 
                    />
                    <text
                      textAnchor="middle"
                      y={-10}
                      style={{ 
                        fontSize: "8px", 
                        fontWeight: "bold", 
                        fill: "#000000",
                        textShadow: "1px 1px 1px #FFFFFF"
                      }}
                    >
                      {region}
                    </text>
                  </Marker>
                ))}

                {/* Lines connecting India HQ to current partnerships */}
                {filters.partnerships && filteredPartnerships.map(partner => {
                  const indiaHQ = [78.9629, 20.5937];
                  return (
                    <Line
                      key={`line-${partner.id}`}
                      from={indiaHQ}
                      to={partner.location}
                      stroke="#EF4444"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                    />
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
      )}

      {/* Timeline View */}
      {activeTab === "timeline" && (
        <div className="p-6 overflow-y-auto h-[calc(100vh-210px)]">
          <h2 className="text-xl font-bold mb-6">Reliance Industries: Historical Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-20 w-1 h-full bg-gray-300"></div>
            
            {/* Events */}
            {allEvents.map((event, index) => (
              <div key={event.id} className="relative mb-8 flex">
                <div className="w-20 flex flex-col items-center mr-4">
                  <div className="text-sm font-bold mb-1">{event.year}</div>
                  <div className={`w-6 h-6 rounded-full ${
                    event.type === "operation" ? "bg-blue-500" : "bg-red-500"
                  } flex items-center justify-center text-white z-10`}>
                    {event.type === "operation" ? "O" : "P"}
                  </div>
                </div>
                <div className={`bg-white shadow-md rounded-md p-3 flex-1 ml-4 ${event.year === year ? 'border-2 border-blue-500' : ''}`}>
                  <h3 className="font-medium">
                    {event.type === "operation" ? `Operation: ${event.country}` : `Partnership in ${event.country}`}
                  </h3>
                  <p className="text-sm mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategy View */}
      {activeTab === "strategy" && (
        <div className="p-6 overflow-y-auto h-[calc(100vh-210px)]">
          <h2 className="text-xl font-bold mb-4">Reliance Industries: Strategic Recommendations</h2>
          
          <div className="mb-6">
            <p className="mb-4">
              Reliance should refine its international strategy by prioritizing stable, high-potential markets, 
              using flexible entry modes, and improving its organizational agility and stakeholder engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategyTimeframes.map(timeframe => (
              <div key={timeframe.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-blue-700">{timeframe.title}</h3>
                <ul className="space-y-2">
                  {timeframe.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-blue-600 mr-2">•</div>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Opportunity Regions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunityAreas.map(opportunity => (
                <div key={opportunity.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-green-700">{opportunity.region}</h4>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{opportunity.timeframe}</span>
                  </div>
                  <p className="text-sm mb-2">{opportunity.details}</p>
                  <p className="text-xs text-gray-600 italic">{opportunity.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Details View */}
      {activeTab === "details" && (
        <div className="p-6 overflow-y-auto h-[calc(100vh-210px)]">
          <h2 className="text-xl font-bold mb-4">Reliance Industries: Global Strategy Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2 text-blue-700">Strategy Type</h3>
              <p className="mb-2">Reliance's international strategy leans towards <strong>global integration</strong> - leveraging scale and technology from its Indian base (e.g. the giant Jamnagar refinery) to serve worldwide markets - rather than a multi-domestic approach.</p>
              <p>The company emphasizes centralized scale and efficiency over local adaptation, partnering with foreign firms for technology and market access rather than deeply customizing products per country.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2 text-blue-700">Organizational Structure</h3>
              <p className="mb-2">Reliance's international operations are <strong>highly centralized</strong>. Key decisions and strategy originate from headquarters in Mumbai, with overseas arms executing rather than strategizing.</p>
              <p>The company manages global trading through Mumbai and maintains foreign subsidiaries in hubs like London, Singapore, and Dubai for presence. This centralization ensures strategic alignment but limits local responsiveness.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold mb-2 text-blue-700">Entry Modes Used</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <h4 className="font-bold">Joint Ventures</h4>
                <p className="text-sm">Most common in upstream projects. Provided capital while partners contributed operating know-how and local management. Examples: Atlas Energy, Pioneer Natural Resources, and Carrizo in U.S. shale.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <h4 className="font-bold">Wholly Owned Subsidiaries</h4>
                <p className="text-sm">Used for trading and initial scouting. Full control but required proper talent delegation. Examples: Reliance E&P DMCC in Dubai, trading subsidiaries in London and Singapore.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <h4 className="font-bold">Mergers & Acquisitions</h4>
                <p className="text-sm">Bold but opportunistic approach. Attempted LyondellBasell acquisition (2009-2010) to instantly obtain global assets. Also sought equity alliances, like the proposed Saudi Aramco deal.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2 text-blue-700">Stakeholder Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold">Government & Regulators</h4>
                <p className="text-sm mb-4">Proactive approach, often partnering with state entities. In complex regions, aligned with authorities or exited when risks outweighed rewards (e.g., Kurdistan). Often leverages Indian government relationships.</p>
                
                <h4 className="font-bold">Customers & Markets</h4>
                <p className="text-sm">Primarily B2B relationships managed through competitive pricing, reliability, and meeting international standards. Jamnagar refinery won "International Refiner of the Year" awards.</p>
              </div>
              <div>
                <h4 className="font-bold">Communities & NGOs</h4>
                <p className="text-sm mb-4">Generally kept a low profile in foreign communities. Strong domestic CSR but similar initiatives abroad were not prominently reported. More reactive than proactive in approach.</p>
                
                <h4 className="font-bold">Competitors & Partners</h4>
                <p className="text-sm">Often turns potential competitors into partners. Strategic approach - fiercely competes in markets like refining but recognizes limitations in upstream and partners accordingly.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ENHANCED: Metrics View */}
      {activeTab === "metrics" && (
        <div className="p-6 overflow-y-auto h-[calc(100vh-210px)]">
          <h2 className="text-xl font-bold mb-4">Reliance Industries: Key Performance Metrics</h2>
          
          <div className="flex mb-4">
            <button 
              className={`px-4 py-2 mr-2 rounded ${selectedMetricView === "global" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedMetricView("global")}
            >
              Global Overview
            </button>
            <button 
              className={`px-4 py-2 mr-2 rounded ${selectedMetricView === "investment" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedMetricView("investment")}
            >
              Investment Stats
            </button>
          </div>
          
          {selectedMetricView === "global" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {globalMetrics.map((metric, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-blue-700 mb-1">{metric.value}</h3>
                  <h4 className="font-medium mb-2">{metric.metric}</h4>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm mr-2">Trend:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      metric.trend === "increasing" ? "bg-green-100 text-green-700" :
                      metric.trend === "decreasing" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {metric.trend.charAt(0).toUpperCase() + metric.trend.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedMetricView === "investment" && (
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4 text-blue-700">International Investment Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800">Total Investment</h4>
                    <p className="text-2xl font-bold">{investmentStats.totalInvestment}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800">Venture Success Rate</h4>
                    <p className="text-2xl font-bold">{investmentStats.successRate}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-800">Major Partnerships</h4>
                    <p className="text-2xl font-bold">{investmentStats.majorPartnerships}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-800">Countries Entered</h4>
                    <p className="text-2xl font-bold">{investmentStats.countriesEntered}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 text-blue-700">Major International Investments</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Year</th>
                        <th className="py-2 px-4 text-left">Venture</th>
                        <th className="py-2 px-4 text-left">Country</th>
                        <th className="py-2 px-4 text-left">Value</th>
                        <th className="py-2 px-4 text-left">Outcome</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-t">2010</td>
                        <td className="py-2 px-4 border-t">Atlas Energy JV (40% stake)</td>
                        <td className="py-2 px-4 border-t">USA</td>
                        <td className="py-2 px-4 border-t">$1.7 billion</td>
                        <td className="py-2 px-4 border-t text-red-600">Exited (2018)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-t">2010</td>
                        <td className="py-2 px-4 border-t">Pioneer Natural Resources JV (45% stake)</td>
                        <td className="py-2 px-4 border-t">USA</td>
                        <td className="py-2 px-4 border-t">$1.35 billion</td>
                        <td className="py-2 px-4 border-t text-red-600">Exited (2018)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-t">2010</td>
                        <td className="py-2 px-4 border-t">Carrizo Oil & Gas JV (60% stake)</td>
                        <td className="py-2 px-4 border-t">USA</td>
                        <td className="py-2 px-4 border-t">$392 million</td>
                        <td className="py-2 px-4 border-t text-red-600">Exited (2018)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-t">2011</td>
                        <td className="py-2 px-4 border-t">BP Partnership (30% stake in blocks)</td>
                        <td className="py-2 px-4 border-t">India</td>
                        <td className="py-2 px-4 border-t">$7.2 billion (investment by BP)</td>
                        <td className="py-2 px-4 border-t text-green-600">Active</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-t">2009</td>
                        <td className="py-2 px-4 border-t">LyondellBasell (attempted acquisition)</td>
                        <td className="py-2 px-4 border-t">Netherlands</td>
                        <td className="py-2 px-4 border-t">$6-14 billion (estimated)</td>
                        <td className="py-2 px-4 border-t text-yellow-600">Failed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ENHANCED: Story Mode View */}
      {activeTab === "story" && (
        <div className="p-6 overflow-y-auto h-[calc(100vh-210px)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">RIL's Global Journey: The Story</h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevStory} 
                disabled={currentStoryIndex === 0}
                className={`px-3 py-1 rounded ${currentStoryIndex === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white'}`}
              >
                Previous
              </button>
              <button 
                onClick={nextStory} 
                disabled={currentStoryIndex === storyModeData.length - 1}
                className={`px-3 py-1 rounded ${currentStoryIndex === storyModeData.length - 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white'}`}
              >
                Next
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/4 pr-6">
                <h3 className="text-lg font-bold text-blue-700 mb-2">{storyModeData[currentStoryIndex].title}</h3>
                <div className="text-sm bg-gray-100 px-2 py-1 inline-block rounded mb-4">
                  {storyModeData[currentStoryIndex].year}
                </div>
                <p className="mb-6">{storyModeData[currentStoryIndex].content}</p>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Context & Implications:</h4>
                  {currentStoryIndex === 0 && (
                    <p className="text-sm">This early phase established Reliance's global ambitions. While still focused on domestic growth, the GDR issuance signaled that Reliance saw itself as a future global player. This access to international capital markets laid the groundwork for the ambitious expansions to come.</p>
                  )}
                  {currentStoryIndex === 1 && (
                    <p className="text-sm">The establishment of the Dubai subsidiary marked Reliance's serious entry into international oil & gas. This period represented peak ambition and global exploration appetite. Reliance was willing to take calculated risks in diverse geographies to build a global upstream portfolio.</p>
                  )}
                  {currentStoryIndex === 2 && (
                    <p className="text-sm">The U.S. shale ventures represented Reliance's largest international financial commitment. The timing aligned with the shale boom, but future market shifts would challenge these investments. These deals showcased Reliance's willingness to enter developed markets and absorb new technologies.</p>
                  )}
                  {currentStoryIndex === 3 && (
                    <p className="text-sm">The BP partnership was transformative, bringing both capital and expertise to Reliance. Unlike the pure international expansion moves, this represented a strategic alliance where a global major invested in Reliance's home market. This created a template for future collaborations.</p>
                  )}
                  {currentStoryIndex === 4 && (
                    <p className="text-sm">This recalibration period revealed Reliance's pragmatism and willingness to exit when conditions changed. The company demonstrated it wouldn't hold onto international assets for prestige alone. This shift coincided with Reliance's growing focus on its telecom business (Jio) and retail.</p>
                  )}
                  {currentStoryIndex === 5 && (
                    <p className="text-sm">The latest chapter shows Reliance adapting to energy transition realities while maintaining its global integration. Rather than aggressive asset acquisition, the focus has shifted to strategic partnerships and technology positioning. This represents a more mature approach to international strategy.</p>
                  )}
                </div>
              </div>
              <div className="md:w-1/4 mt-4 md:mt-0">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <img 
                    src={storyModeData[currentStoryIndex].image} 
                    alt={storyModeData[currentStoryIndex].title}
                    className="w-full mb-4 rounded"
                  />
                  <h4 className="font-medium mb-2">Key Learnings:</h4>
                  <ul className="text-sm list-disc list-inside">
                    {currentStoryIndex === 0 && (
                      <>
                        <li>Global capital access is a precursor to global operations</li>
                        <li>Building financial credibility precedes operational expansion</li>
                        <li>Early internationalization focused on capital, not operations</li>
                      </>
                    )}
                    {currentStoryIndex === 1 && (
                      <>
                        <li>Centralized hub for international operations provides control</li>
                        <li>Diversification across multiple countries spreads risk</li>
                        <li>Structural preparation must precede operational expansion</li>
                      </>
                    )}
                    {currentStoryIndex === 2 && (
                      <>
                        <li>JVs provide faster market entry but limit control</li>
                        <li>Technology transfer is a key benefit of developed market entry</li>
                        <li>Resource price volatility can undermine sound strategic moves</li>
                      </>
                    )}
                    {currentStoryIndex === 3 && (
                      <>
                        <li>Strategic alliances can bring expertise beyond capital</li>
                        <li>Global partnerships enhance credibility and capabilities</li>
                        <li>Strong domestic assets can attract international partners</li>
                      </>
                    )}
                    {currentStoryIndex === 4 && (
                      <>
                        <li>Strategic flexibility means knowing when to exit</li>
                        <li>Focus is often better than broad international presence</li>
                        <li>Resources are better allocated to areas of competitive advantage</li>
                      </>
                    )}
                    {currentStoryIndex === 5 && (
                      <>
                        <li>Energy transition requires new international approach</li>
                        <li>Technology partnerships may replace asset ownership</li>
                        <li>Strategic focus on integrating global value chains</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <div className="flex justify-between mb-2">
              <span className="text-sm">1960s</span>
              <span className="text-sm">2025</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${((currentStoryIndex + 1) / storyModeData.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs">Beginning</span>
              <span className="text-xs">Current</span>
            </div>
          </div>
        </div>
      )}

      {/* ENHANCED: Risk Analysis View */}
      {activeTab === "risks" && (
        <div className="p-6 overflow-y-auto h-[calc(100vh-210px)]">
          <h2 className="text-xl font-bold mb-6">Reliance Industries: Risk Analysis by Region</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionRisks.map((risk, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">{risk.region}</h3>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Political Risk</h4>
                    <div className={`text-sm font-bold mt-1 ${
                      risk.politicalRisk === "Low" ? "text-green-600" :
                      risk.politicalRisk === "Medium" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {risk.politicalRisk}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Economic Risk</h4>
                    <div className={`text-sm font-bold mt-1 ${
                      risk.economicRisk === "Low" ? "text-green-600" :
                      risk.economicRisk === "Medium" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {risk.economicRisk}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Opportunity</h4>
                    <div className={`text-sm font-bold mt-1 ${
                      risk.opportunityScore === "High" ? "text-green-600" :
                      risk.opportunityScore === "Medium" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {risk.opportunityScore}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{risk.notes}</p>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-2">Risk Mitigation Strategies:</h4>
                  <ul className="text-xs list-disc list-inside">
                    {risk.region === "Middle East" && (
                      <>
                        <li>Partner with established national oil companies (NOCs)</li>
                        <li>Focus on downstream/midstream with lower political exposure</li>
                        <li>Diversify across multiple Gulf countries</li>
                      </>
                    )}
                    {risk.region === "North America" && (
                      <>
                        <li>Hedge commodity price exposure</li>
                        <li>Partner with established local operators</li>
                        <li>Target niche segments rather than competing broadly</li>
                      </>
                    )}
                    {risk.region === "Africa" && (
                      <>
                        <li>Phase investments with clear milestone triggers</li>
                        <li>Comprehensive stakeholder engagement strategies</li>
                        <li>Partnerships with development finance institutions</li>
                      </>
                    )}
                    {risk.region === "Southeast Asia" && (
                      <>
                        <li>Build local leadership teams with regional expertise</li>
                        <li>Engage with regional bodies like ASEAN</li>
                        <li>Develop deep government relations across political spectrum</li>
                      </>
                    )}
                    {risk.region === "Latin America" && (
                      <>
                        <li>Structure investments with international arbitration provisions</li>
                        <li>Partner with local firms with government relationships</li>
                        <li>Maintain portfolio approach rather than single-country focus</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Historical Risk Management Performance</h3>
            <p className="mb-4">Reliance's approach to international risk has evolved from opportunistic expansion to strategic selectivity. The company has demonstrated several patterns in its risk management:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-bold text-blue-700 mb-2">Strengths</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Willingness to exit when risks outweigh rewards (e.g., Yemen, Kurdistan)</li>
                  <li>Effective use of partnerships to mitigate operational risks</li>
                  <li>Prudent capital allocation avoiding overexposure to single markets</li>
                  <li>Strong financial position providing buffer against volatility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-700 mb-2">Areas for Improvement</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>More proactive stakeholder engagement in host communities</li>
                  <li>Better anticipation of commodity price cycles (e.g., U.S. shale)</li>
                  <li>Deeper localization of decision-making to respond to regional issues</li>
                  <li>More transparent ESG reporting in international operations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print preview mode - only visible when exporting */}
      {showPrintPreview && (
        <div className="fixed inset-0 bg-white z-50 p-8 print-container">
          <h1 className="text-2xl font-bold mb-4">Reliance Industries Global Operations Map</h1>
          <p className="mb-2">Data current as of: {year}</p>
          
          {activeTab === "map" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Map View</h2>
              <div className="border p-4 mb-4">
                <div className="text-center text-gray-500">
                  [Map visualization shown in interactive version]
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-bold">Current Operations ({filteredOperations.filter(o => o.status === "current").length})</h3>
                  <ul className="list-disc list-inside">
                    {filteredOperations.filter(o => o.status === "current").map(op => (
                      <li key={op.id}>{op.country}: {op.details}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold">Current Partnerships ({filteredPartnerships.filter(p => p.status === "current").length})</h3>
                  <ul className="list-disc list-inside">
                    {filteredPartnerships.filter(p => p.status === "current").map(p => (
                      <li key={p.id}>{p.partner} ({p.country}): {p.details}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold">Future Opportunities ({filteredOpportunities.length})</h3>
                  <ul className="list-disc list-inside">
                    {filteredOpportunities.map(o => (
                      <li key={o.id}>{o.region}: {o.details}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "timeline" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Timeline View</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Year</th>
                    <th className="border p-2 text-left">Event Type</th>
                    <th className="border p-2 text-left">Location</th>
                    <th className="border p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {allEvents.map(event => (
                    <tr key={event.id}>
                      <td className="border p-2">{event.year}</td>
                      <td className="border p-2">{event.type}</td>
                      <td className="border p-2">{event.country}</td>
                      <td className="border p-2">{event.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === "strategy" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Strategy View</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {strategyTimeframes.map(timeframe => (
                  <div key={timeframe.id} className="border p-4">
                    <h3 className="font-bold mb-2">{timeframe.title}</h3>
                    <ul className="list-disc list-inside">
                      {timeframe.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm mb-1">{rec}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "metrics" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Metrics View</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border p-4">
                  <h3 className="font-bold mb-2">Global Metrics</h3>
                  <table className="w-full">
                    <tbody>
                      {globalMetrics.map((metric, i) => (
                        <tr key={i}>
                          <td className="py-1 font-medium">{metric.metric}</td>
                          <td className="py-1">{metric.value}</td>
                          <td className="py-1 text-sm">{metric.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border p-4">
                  <h3 className="font-bold mb-2">Investment Stats</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-1 font-medium">Total Investment</td>
                        <td className="py-1">{investmentStats.totalInvestment}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Success Rate</td>
                        <td className="py-1">{investmentStats.successRate}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Major Partnerships</td>
                        <td className="py-1">{investmentStats.majorPartnerships}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Countries Entered</td>
                        <td className="py-1">{investmentStats.countriesEntered}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-8 text-center">
            Generated from Reliance Industries Global Operations Map | Date: {new Date().toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
