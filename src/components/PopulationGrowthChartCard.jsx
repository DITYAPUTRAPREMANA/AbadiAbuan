import React, { useState, useMemo } from 'react';
import { TrendingUp, Users, UserPlus, Baby, UserMinus, Building2, Calendar } from 'lucide-react';
import { BIP_LOCATIONS } from '../types/bipConstants';

export default function PopulationGrowthChartCard({ bipData = {}, recapData = {} }) {
  const [selectedBip, setSelectedBip] = useState('Semua BIP');
  const [viewMode, setViewMode] = useState('MONTHLY'); // 'MONTHLY' | 'YEARLY'
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const currentYear = new Date().getFullYear();
  const availableYears = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];

  // Compute growth timeline & metrics for the selected BIP
  const chartData = useMemo(() => {
    // Determine target residents and recaps
    let targetResidents = [];
    if (selectedBip === 'Semua BIP') {
      targetResidents = Object.values(bipData).flat();
    } else {
      targetResidents = bipData[selectedBip] || [];
    }

    // Collect all recaps for selected BIP
    let targetRecaps = [];
    Object.keys(recapData).forEach(recapKey => {
      const list = recapData[recapKey] || [];
      list.forEach(item => {
        if (selectedBip === 'Semua BIP' || item.domisili === selectedBip) {
          targetRecaps.push(item);
        }
      });
    });

    let points = [];

    if (viewMode === 'YEARLY') {
      // Generate last 6 years timeline
      const years = [currentYear - 5, currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];

      points = years.map(year => {
        const countAtYear = targetResidents.filter(r => {
          if (!r.tanggalMasuk) return true;
          const entryYear = new Date(r.tanggalMasuk).getFullYear();
          return entryYear <= year;
        }).length;

        const recapsInYear = targetRecaps.filter(r => {
          if (!r.tanggalTransaksi) return false;
          return new Date(r.tanggalTransaksi).getFullYear() === year;
        });

        const lahir = recapsInYear.filter(r => r.kategori === 'Lahir').length;
        const pindah = recapsInYear.filter(r => r.kategori === 'Pindah Datang' || r.kategori === 'Pindah Masuk').length;
        const meninggal = recapsInYear.filter(r => r.kategori === 'Meninggal').length;

        return {
          label: String(year),
          year: String(year),
          population: countAtYear,
          lahir,
          pindah,
          meninggal
        };
      });
    } else {
      // Monthly Timeline for selectedYear
      points = monthNames.map((mName, mIdx) => {
        const lastDayOfMonth = new Date(selectedYear, mIdx + 1, 0);

        const countAtMonth = targetResidents.filter(r => {
          if (!r.tanggalMasuk) return true;
          const d = new Date(r.tanggalMasuk);
          return d <= lastDayOfMonth;
        }).length;

        const recapsInMonth = targetRecaps.filter(r => {
          if (!r.tanggalTransaksi) return false;
          const d = new Date(r.tanggalTransaksi);
          return d.getFullYear() === Number(selectedYear) && d.getMonth() === mIdx;
        });

        const lahir = recapsInMonth.filter(r => r.kategori === 'Lahir').length;
        const pindah = recapsInMonth.filter(r => r.kategori === 'Pindah Datang' || r.kategori === 'Pindah Masuk').length;
        const meninggal = recapsInMonth.filter(r => r.kategori === 'Meninggal').length;

        return {
          label: mName,
          year: String(selectedYear),
          population: countAtMonth,
          lahir,
          pindah,
          meninggal
        };
      });
    }

    // Summary stats
    const totalPop = targetResidents.length;
    const totalLahir = targetRecaps.filter(r => r.kategori === 'Lahir').length;
    const totalPindah = targetRecaps.filter(r => r.kategori === 'Pindah Datang' || r.kategori === 'Pindah Masuk').length;
    const totalMeninggal = targetRecaps.filter(r => r.kategori === 'Meninggal').length;

    // Net growth percentage over recent period
    const startPop = points[0]?.population || 1;
    const endPop = points[points.length - 1]?.population || 1;
    const growthRate = (((endPop - startPop) / Math.max(startPop, 1)) * 100).toFixed(1);

    return {
      points,
      totalPop,
      totalLahir,
      totalPindah,
      totalMeninggal,
      growthRate: Number(growthRate) >= 0 ? `+${growthRate}%` : `${growthRate}%`
    };
  }, [selectedBip, viewMode, selectedYear, bipData, recapData]);

  // SVG Chart Geometry - Slim & Compact Version
  const width = 600;
  const height = 150;
  const padding = 28;

  const minVal = Math.min(...chartData.points.map(p => p.population), 0);
  const maxVal = Math.max(...chartData.points.map(p => p.population), 10);
  const range = maxVal - minVal || 1;

  const getX = (index) => padding + (index * (width - padding * 2)) / (chartData.points.length - 1);
  const getY = (val) => height - padding - ((val - minVal) * (height - padding * 2)) / range;

  // Build SVG path d attribute
  const pathD = chartData.points.reduce((acc, point, i) => {
    const x = getX(i);
    const y = getY(point.population);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Fill area under path
  const areaD = `${pathD} L ${getX(chartData.points.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

  return (
    <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header with BIP Switcher & Period Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
            <TrendingUp size={18} color="#10b981" /> Grafik &amp; Trend Pertumbuhan Penduduk
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>
            Pertumbuhan populasi otomatis berdasarkan catatan registrasi dan rekapitulasi data BIP.
          </p>
        </div>

        {/* Period Switcher & BIP Selector */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          {/* Mode Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '2px',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setViewMode('MONTHLY')}
              style={{
                padding: '0.3rem 0.65rem',
                fontSize: '0.75rem',
                fontWeight: viewMode === 'MONTHLY' ? 700 : 500,
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'MONTHLY' ? '#10b981' : 'transparent',
                color: viewMode === 'MONTHLY' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Per Bulan
            </button>
            <button
              onClick={() => setViewMode('YEARLY')}
              style={{
                padding: '0.3rem 0.65rem',
                fontSize: '0.75rem',
                fontWeight: viewMode === 'YEARLY' ? 700 : 500,
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'YEARLY' ? '#10b981' : 'transparent',
                color: viewMode === 'YEARLY' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Per Tahun
            </button>
          </div>

          {/* Select Year when Monthly mode */}
          {viewMode === 'MONTHLY' && (
            <select
              className="form-input"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.35rem 0.6rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {availableYears.map(yr => (
                <option key={yr} value={yr}>Tahun {yr}</option>
              ))}
            </select>
          )}

          {/* BIP Switcher Selector */}
          <select
            className="form-input"
            value={selectedBip}
            onChange={(e) => setSelectedBip(e.target.value)}
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--accent-primary)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <option value="Semua BIP">Semua BIP (Desa Abuan)</option>
            {BIP_LOCATIONS.map(bip => (
              <option key={bip.id} value={bip.name}>{bip.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: '0.625rem'
      }}>
        <div className="glass-card" style={{ padding: '0.65rem 0.875rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Total Penduduk</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#3b82f6' }}>
            {chartData.totalPop} <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>jiwa</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0.65rem 0.875rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Trend Pertumbuhan</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981' }}>
            {chartData.growthRate}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0.65rem 0.875rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Total Lahir</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#8b5cf6' }}>
            +{chartData.totalLahir}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0.65rem 0.875rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Pindah Masuk/Datang</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#06b6d4' }}>
            +{chartData.totalPindah}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0.65rem 0.875rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Meninggal</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ef4444' }}>
            -{chartData.totalMeninggal}
          </div>
        </div>
      </div>

      {/* SVG Interactive Line / Area Chart - Slim Version */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', minHeight: '140px' }}>
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          {[0, 0.33, 0.66, 1].map((ratio, idx) => {
            const y = padding + ratio * (height - padding * 2);
            return (
              <line
                key={idx}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="var(--border-color)"
                strokeDasharray="3 3"
                strokeWidth="0.75"
                opacity="0.5"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#growthGradient)" />

          {/* Slim Main Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points - Slim */}
          {chartData.points.map((pt, i) => {
            const x = getX(i);
            const y = getY(pt.population);
            const isHovered = hoveredPoint === i;

            return (
              <g key={i} onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "5" : "3.5"}
                  fill={isHovered ? "#34d399" : "#10b981"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* X Axis Label - Slim */}
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="9"
                  fontWeight="500"
                >
                  {pt.label}
                </text>

                {/* Y Value label on top of point - Slim */}
                <text
                  x={x}
                  y={y - 7}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="9"
                  fontWeight="600"
                >
                  {pt.population}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Info Tooltip Banner */}
        {hoveredPoint !== null && (
          <div style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'rgba(15, 23, 42, 0.92)',
            border: '1px solid #10b981',
            borderRadius: '6px',
            padding: '0.4rem 0.75rem',
            fontSize: '0.75rem',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 10
          }}>
            <strong>{viewMode === 'MONTHLY' ? `Bulan ${chartData.points[hoveredPoint].label} ${selectedYear}` : `Tahun ${chartData.points[hoveredPoint].label}`} ({selectedBip})</strong>
            <div>Total Populasi: <strong>{chartData.points[hoveredPoint].population} jiwa</strong></div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.15rem' }}>
              Lahir: +{chartData.points[hoveredPoint].lahir} | Pindah: +{chartData.points[hoveredPoint].pindah} | Meninggal: -{chartData.points[hoveredPoint].meninggal}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
