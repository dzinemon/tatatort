
import React, { useState, useEffect, useRef } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useOutsideClick from '../utils/outside-click';
import { ChevronDownIcon, CakeIcon } from '@heroicons/react/24/solid';

const BASE_PRICE = 1200; // UAH per kg
const MIN_WEIGHT = 2.5; // kg

const DECOR_LEVELS = [
  //{ id: 'minimal', name: 'Мінімальний', price: 0, description: 'Мінімальний декор (посипка, написи)' },
  { id: 'standard', name: 'Стандарт', price: 0, description: 'Льодяники, солодощі, цукрові картинки або топер' },
  { id: 'premium', name: 'Преміум', price: 600, description: 'Складні фігурки, живі квіти, пряники, особливі побажання' },
];

const Calculator = ({ fillingGroups }) => {
  const [weight, setWeight] = useState(MIN_WEIGHT);
  const [filling, setFilling] = useState(null); // Object: { name, image }
  const [decor, setDecor] = useState(DECOR_LEVELS[0].id);
  const [delivery, setDelivery] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    const decorPrice = DECOR_LEVELS.find(d => d.id === decor)?.price || 0;
    const baseTotal = (weight * BASE_PRICE) + decorPrice;
    setTotalPrice(baseTotal);
  }, [weight, filling, decor]);

  const handleWeightChange = (e) => {
    let val = parseFloat(e.target.value);
    if (val < MIN_WEIGHT) val = MIN_WEIGHT;
    setWeight(val);
  };

  const getOrderLink = () => {
    const decorName = DECOR_LEVELS.find(d => d.id === decor)?.name;
    const fillingName = filling ? filling.name : 'Не обрано';
    
    const text = `Вітаю! 👋 Хочу замовити торт:%0A` +
                 `⚖️ Вага: ${weight} кг%0A` +
                 `🍰 Начинка: ${fillingName}%0A` +
                 `✨ Декор: ${decorName}%0A` +
                 `🚚 Доставка: ${delivery ? 'Так' : 'Ні'}%0A` +
                 `💰 Орієнтовна вартість: ${totalPrice} грн`;
                 
    return `https://t.me/TataUtekhina?text=${text}`; 
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-cyan-100 max-w-2xl mx-auto">
      <h2 className="text-3xl font-poiret text-center mb-6 text-cyan-900">Калькулятор вартості торту</h2>
      
      <div className="space-y-6">
        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-gray-700 font-bold mb-2">
            Вага (кг) - Мінімум {MIN_WEIGHT} кг
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              id="weight-slider"
              min={MIN_WEIGHT}
              max="10"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <input
              type="number"
              id="weight"
              min={MIN_WEIGHT}
              max="10"
              step="0.5"
              value={weight}
              onChange={handleWeightChange}
              className="w-24 p-2 border border-gray-300 rounded-lg text-center"
            />
          </div>
        </div>

        {/* Custom Flavor Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-gray-700 font-bold mb-2">
            Начинка
          </label>
          <button
             type="button"
             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
             className="w-full p-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {filling ? (
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                   {filling.image && getImage(filling.image) ? (
                     <GatsbyImage image={getImage(filling.image)} alt={filling.name} className="w-full h-full object-cover" />
                   ) : (
                     <CakeIcon className="w-5 h-5 text-gray-400" />
                   )}
                 </div>
                 <span>{filling.name}</span>
              </div>
            ) : (
              <span className="text-gray-500">Оберіть начинку</span>
            )}
            <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-96 overflow-y-auto">
              {fillingGroups && fillingGroups.map((group, idx) => (
                <div key={idx}>
                  <div className="px-4 py-2 bg-gray-50 font-bold text-sm text-gray-500 font-poiret uppercase tracking-wider sticky top-0 z-10">
                    {group.groupTitle}
                  </div>
                  {group.items && group.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      type="button"
                      onClick={() => {
                        setFilling(item);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-cyan-50 flex items-center gap-3 text-left transition-colors"
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 flex items-center justify-center">
                         {item.image && getImage(item.image) ? (
                           <GatsbyImage image={getImage(item.image)} alt={item.name} className="w-full h-full object-cover" />
                         ) : (
                           <CakeIcon className="w-6 h-6 text-gray-400" />
                         )}
                      </div>
                      <span className="text-gray-700">{item.name}</span>
                    </button>
                  ))}
                </div>
              ))}
              {(!fillingGroups || fillingGroups.length === 0) && (
                <div className="p-4 text-center text-gray-500">Начинок не знайдено</div>
              )}
            </div>
          )}
        </div>

        {/* Decor */}
        <div>
          <span className="block text-gray-700 font-bold mb-2">Рівень декору</span>
          <div className="grid md:grid-cols-2 gap-4">
            {DECOR_LEVELS.map((level) => (
              <label key={level.id} className={`
                cursor-pointer border-2 rounded-lg p-4 transition-all
                ${decor === level.id ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 hover:border-cyan-300'}
              `}>
                <input
                  type="radio"
                  name="decor"
                  value={level.id}
                  checked={decor === level.id}
                  onChange={(e) => setDecor(e.target.value)}
                  className="sr-only"
                />
                <div className="font-bold text-gray-800">{level.name}</div>
                <div className="text-xs text-gray-500 mt-1">{level.description}</div>
                <div className="text-sm font-semibold text-cyan-700 mt-2">
                  {level.price === 0 ? 'Включено' : `+${level.price} грн`}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="delivery"
            checked={delivery}
            onChange={(e) => setDelivery(e.target.checked)}
            className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
          />
          <label htmlFor="delivery" className="text-gray-700">
            Потрібна доставка
          </label>
        </div>

        {/* Total & Action */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">Орієнтовна вартість:</p>
              <p className="text-4xl font-poiret font-bold text-cyan-900">
                {totalPrice} - {totalPrice + 300} грн
              </p>
            </div>
            
            <a 
              href={getOrderLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Замовити з цими параметрами (Telegram)
            </a>
          </div>
          <p className="text-xs text-center text-gray-400 mt-4">
            * Остаточна ціна може змінюватись в залежності від конкретних побажань до оформлення.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
