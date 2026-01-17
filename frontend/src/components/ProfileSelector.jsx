import { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, Check, Plus } from 'lucide-react';

const ProfileSelector = ({ profiles, selected, onChange, onCreateProfile, placeholder = "Select profiles...", multiple = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowAddInput(false);
        setNewProfileName('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (profile) => {
    if (multiple) {
      const isSelected = selected.some(p => p._id === profile._id);
      if (isSelected) {
        onChange(selected.filter(p => p._id !== profile._id));
      } else {
        onChange([...selected, profile]);
      }
    } else {
      onChange(profile);
      setIsOpen(false);
    }
  };

  const handleRemove = (profile, e) => {
    e.stopPropagation();
    if (multiple) {
      onChange(selected.filter(p => p._id !== profile._id));
    } else {
      onChange(null);
    }
  };

  const handleAddProfile = async (e) => {
    e.preventDefault();
    if (newProfileName.trim()) {
      try {
        await onCreateProfile(newProfileName.trim());
        setNewProfileName('');
        setShowAddInput(false);
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    }
  };

  const isSelected = (profile) => {
    if (multiple) {
      return selected.some(p => p._id === profile._id);
    }
    return selected?._id === profile._id;
  };

  const displayText = () => {
    if (multiple) {
      if (selected.length === 0) return placeholder;
      if (selected.length === 1) return selected[0].name;
      return `${selected.length} profiles selected`;
    }
    return selected ? selected.name : placeholder;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-700">{displayText()}</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {multiple && selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map(profile => (
            <span
              key={profile._id}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm"
            >
              {profile.name}
              <button
                type="button"
                onClick={(e) => handleRemove(profile, e)}
                className="hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto">
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="py-1">
            {filteredProfiles.map(profile => (
              <button
                key={profile._id}
                type="button"
                onClick={() => handleToggle(profile)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between group"
              >
                <span className="text-gray-700">{profile.name}</span>
                {isSelected(profile) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}

            {filteredProfiles.length === 0 && !showAddInput && (
              <div className="px-4 py-3 text-gray-500 text-sm text-center">
                No profiles found
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 p-2">
            {!showAddInput ? (
              <button
                type="button"
                onClick={() => setShowAddInput(true)}
                className="w-full px-3 py-2 text-primary hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Profile
              </button>
            ) : (
              <form onSubmit={handleAddProfile} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Profile name..."
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover text-sm font-medium"
                >
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
