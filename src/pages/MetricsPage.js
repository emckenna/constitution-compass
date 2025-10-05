import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MetricsPage = ({ page, setPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    fetchStats(selectedDifficulty);
  }, [selectedDifficulty]);

  const fetchStats = async (difficulty) => {
    setLoading(true);
    try {
      const url = difficulty === 'all'
        ? '/api/stats'
        : `/api/stats?difficulty=${difficulty}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Colors matching the app theme (indigo/blue gradient)
  const DIFFICULTY_COLORS = {
    easy: '#10b981',   // green
    medium: '#f59e0b', // amber
    hard: '#ef4444'    // red
  };

  const formatPercentage = (decimal) => {
    return `${Math.round(decimal * 100)}%`;
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation
          page={page}
          setPage={setPage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-indigo-600 text-xl">Loading analytics...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation
          page={page}
          setPage={setPage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        page={page}
        setPage={setPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">📊 Analytics Dashboard</h1>
            <p className="text-gray-600">Constitutional knowledge across the nation</p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg">
                  <Users className="text-indigo-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.overall?.total_scores || 0}
              </div>
              <div className="text-sm text-gray-600">Total Quizzes Taken</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.overall?.overall_avg_score ? formatPercentage(stats.overall.overall_avg_score) : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Overall Average Score</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <Award className="text-purple-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.overall?.total_regions || 0}
              </div>
              <div className="text-sm text-gray-600">Regions Participating</div>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <BarChart3 className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Performance by Difficulty</h2>
            </div>

            {/* Difficulty Bar Chart */}
            {stats?.byDifficulty && stats.byDifficulty.length > 0 ? (
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.byDifficulty}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="difficulty"
                      tick={{ fill: '#6b7280' }}
                      tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                    />
                    <YAxis
                      tick={{ fill: '#6b7280' }}
                      tickFormatter={(value) => `${Math.round(value * 100)}%`}
                      domain={[0, 1]}
                    />
                    <Tooltip
                      formatter={(value) => formatPercentage(value)}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar dataKey="avg_score" radius={[8, 8, 0, 0]}>
                      {stats.byDifficulty.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DIFFICULTY_COLORS[entry.difficulty]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available yet</p>
            )}

            {/* Difficulty Stats Table */}
            {stats?.byDifficulty && stats.byDifficulty.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Avg Score</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Attempts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.byDifficulty.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: DIFFICULTY_COLORS[item.difficulty] }}
                            />
                            <span className="font-medium capitalize">{item.difficulty}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-900 font-semibold">
                          {formatPercentage(item.avg_score)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {item.total_attempts}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Regional Rankings */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Award className="text-indigo-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Regional Rankings</h2>
              </div>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {stats?.regional && stats.regional.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Region</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Country</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Avg Score</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Attempts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.regional.map((region, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {region.region}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {region.country}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900">
                            {formatPercentage(region.avg_score)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {region.total_attempts}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No regional data available yet</p>
            )}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
