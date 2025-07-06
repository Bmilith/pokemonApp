import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { CheckIcon } from '@/assets';

interface DropDownMultiProps {
  label?: string;
  options: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  multiSelect?: boolean;
}

export const Dropdown = ({
  label,
  options,
  selectedValues,
  onToggle,
  multiSelect,
}: DropDownMultiProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value: string) => {
    onToggle(value);
    if (!multiSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full relative">
      {label && (
        <label className="block my-2 text-xl font-semibold text-white tracking-widest ">
          {label}
        </label>
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full justify-between items-center border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm text-sm text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <span className="truncate">
          {selectedValues.length > 0 ? (
            selectedValues.map((val) => (
              <span
                key={val}
                className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded mr-1"
              >
                {val}
              </span>
            ))
          ) : (
            <span className="text-gray-400">-- Select {label} --</span>
          )}
        </span>
        <IoChevronDown
          className={`ml-2 h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 bottom-full mb-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-auto">
          {options.map((option) => {
            const value = option.toLowerCase();
            const isChecked = selectedValues.includes(value);

            return (
              <label
                key={option}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-50"
              >
                <input
                  type={multiSelect ? 'checkbox' : 'radio'}
                  name={label}
                  checked={isChecked}
                  onChange={() => handleToggle(value)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors ${
                    isChecked
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isChecked && multiSelect && (
                    <img
                      src={CheckIcon}
                      alt="Check icon"
                      width={12}
                      height={12}
                    />
                  )}
                  {isChecked && !multiSelect && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </span>
                <span className="text-sm text-gray-700 capitalize">
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
