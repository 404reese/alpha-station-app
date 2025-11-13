"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  id: string;
  name: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
  isDark: boolean;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder,
  isDark,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeClasses = {
    bgPrimary: isDark ? 'bg-stone-800' : 'bg-white',
    bgSecondary: isDark ? 'bg-stone-700' : 'bg-stone-50',
    bgHover: isDark ? 'hover:bg-stone-600' : 'hover:bg-stone-100',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    border: isDark ? 'border-stone-600' : 'border-stone-300',
    borderFocus: isDark ? 'border-orange-400' : 'border-orange-500',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.id === selectedValue);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
        {label}
      </label>
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 text-left
          ${themeClasses.bgPrimary} ${themeClasses.border}
          ${isOpen ? themeClasses.borderFocus : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-orange-400'}
          rounded-lg transition-colors duration-200
          flex items-center justify-between
        `}
      >
        <span className={selectedOption ? themeClasses.textPrimary : themeClasses.textMuted}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 ${themeClasses.textMuted} transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className={`
          absolute z-50 w-full mt-1
          ${themeClasses.bgPrimary} ${themeClasses.border}
          rounded-lg shadow-lg max-h-60 overflow-y-auto
        `}>
          {options.length === 0 ? (
            <div className={`px-4 py-3 ${themeClasses.textMuted} text-sm`}>
              No options available
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3 text-left transition-colors duration-150
                  ${themeClasses.bgHover}
                  ${selectedValue === option.id ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' : themeClasses.textPrimary}
                  flex items-center justify-between
                  first:rounded-t-lg last:rounded-b-lg
                `}
              >
                <span className="truncate">{option.name}</span>
                {selectedValue === option.id && (
                  <Check className="w-4 h-4 text-orange-500" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

interface DepartmentSubjectDropdownProps {
  selectedDepartment: string;
  selectedSubject: string;
  onDepartmentChange: (departmentId: string) => void;
  onSubjectChange: (subjectId: string) => void;
  departments: Array<{ id: string; name: string; subjects: Array<{ id: string; name: string }> }>;
  isDark: boolean;
}

export const DepartmentSubjectDropdown: React.FC<DepartmentSubjectDropdownProps> = ({
  selectedDepartment,
  selectedSubject,
  onDepartmentChange,
  onSubjectChange,
  departments,
  isDark
}) => {
  const departmentOptions = departments.map(dept => ({
    id: dept.id,
    name: dept.name
  }));

  const selectedDepartmentData = departments.find(dept => dept.id === selectedDepartment);
  const subjectOptions = selectedDepartmentData ? selectedDepartmentData.subjects : [];

  const handleDepartmentChange = (departmentId: string) => {
    onDepartmentChange(departmentId);
    // Reset subject selection when department changes
    onSubjectChange('');
  };

  return (
    <div className="space-y-4">
      <Dropdown
        label="Department"
        options={departmentOptions}
        selectedValue={selectedDepartment}
        onSelect={handleDepartmentChange}
        placeholder="Select a department"
        isDark={isDark}
      />
      
      <Dropdown
        label="Subject"
        options={subjectOptions}
        selectedValue={selectedSubject}
        onSelect={onSubjectChange}
        placeholder="Select a subject"
        isDark={isDark}
        disabled={!selectedDepartment}
      />
    </div>
  );
};

export default DepartmentSubjectDropdown;