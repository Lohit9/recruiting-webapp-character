import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import { Attributes, Class } from './types';

function App() {
  const [attributes, setAttributes] = useState<Record<string, number>>(() => {
    const initialAttributes: Record<string, number> = {};
    ATTRIBUTE_LIST.forEach(attr => {
      initialAttributes[attr] = 10;
    });
    return initialAttributes;
  });

  const handleIncrement = (attr: string) => {
    setAttributes(prev => ({
      ...prev,
      [attr]: prev[attr] + 1
    }));
  };

  const handleDecrement = (attr: string) => {
    setAttributes(prev => ({
      ...prev,
      [attr]: Math.max(0, prev[attr] - 1)
    }));
  };

  const meetsClassRequirements = (className: Class): boolean => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(([attr, minValue]) => 
      attributes[attr] >= minValue
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="attributes-container">
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map(attr => (
            <div key={attr} style={{margin: '10px 0'}}>
              {attr}: {attributes[attr]}
              <button style={{marginLeft: '5px'}} onClick={() => handleIncrement(attr)}>+</button>
              <button onClick={() => handleDecrement(attr)}>-</button>
            </div>
          ))}
        </div>
        <div className="classes-container">
          <h2>Classes</h2>
          {(Object.keys(CLASS_LIST) as Class[]).map(className => (
            <div 
              key={className} 
              className={`class-item ${meetsClassRequirements(className) ? 'requirements-met' : 'requirements-not-met'}`}
            >
              <h3>{className}</h3>
              <div className="class-requirements">
                {Object.entries(CLASS_LIST[className]).map(([attr, value]) => (
                  <div key={attr} className="requirement-item">
                    {attr}: {value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
