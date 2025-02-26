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

  const [skillPoints, setSkillPoints] = useState<Record<string, number>>(() => {
    const initialSkillPoints: Record<string, number> = {};
    SKILL_LIST.forEach(skill => {
      initialSkillPoints[skill.name] = 0;
    });
    return initialSkillPoints;
  });

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const calculateModifier = (attributeValue: number): number => {
    return Math.floor((attributeValue - 10) / 2);
  };

  const getTotalSkillPoints = (): number => {
    const intModifier = calculateModifier(attributes['Intelligence']);
    return 10 + (4 * intModifier);
  };

  const getSpentSkillPoints = (): number => {
    return Object.values(skillPoints).reduce((sum, points) => sum + points, 0);
  };

  const getRemainingSkillPoints = (): number => {
    return getTotalSkillPoints() - getSpentSkillPoints();
  };

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

  const handleSkillIncrement = (skillName: string) => {
    if (getRemainingSkillPoints() > 0) {
      setSkillPoints(prev => ({
        ...prev,
        [skillName]: prev[skillName] + 1
      }));
    }
  };

  const handleSkillDecrement = (skillName: string) => {
    setSkillPoints(prev => ({
      ...prev,
      [skillName]: Math.max(0, prev[skillName] - 1)
    }));
  };

  const calculateSkillTotal = (skillName: string, attributeModifier: string): number => {
    return skillPoints[skillName] + calculateModifier(attributes[attributeModifier]);
  };

  const meetsClassRequirements = (className: Class): boolean => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(([attr, minValue]) => 
      attributes[attr] >= minValue
    );
  };

  const handleClassClick = (className: Class) => {
    setSelectedClass(className === selectedClass ? null : className);
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
            <div key={attr} className="attribute-row" style={{margin: '10px 0'}}>
              <div className="attribute-value">
                {attr}: {attributes[attr]}
                <button style={{marginLeft: '5px'}} onClick={() => handleIncrement(attr)}>+</button>
                <button onClick={() => handleDecrement(attr)}>-</button>
              </div>
              <div className="modifier">
                {attr} Modifier: {calculateModifier(attributes[attr]) >= 0 ? '+' : ''}{calculateModifier(attributes[attr])}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-container">
          <h2>Skills</h2>
          <div className="skill-points-info">
            Available Points: {getRemainingSkillPoints()} / {getTotalSkillPoints()}
          </div>
          {SKILL_LIST.map(skill => (
            <div key={skill.name} className="skill-row">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-controls">
                Points: {skillPoints[skill.name]}
                <button 
                  onClick={() => handleSkillIncrement(skill.name)}
                  disabled={getRemainingSkillPoints() <= 0}
                >+</button>
                <button 
                  onClick={() => handleSkillDecrement(skill.name)}
                  disabled={skillPoints[skill.name] <= 0}
                >-</button>
              </div>
              <div className="skill-modifier">
                Modifier ({skill.attributeModifier}): {calculateModifier(attributes[skill.attributeModifier]) >= 0 ? '+' : ''}{calculateModifier(attributes[skill.attributeModifier])}
              </div>
              <div className="skill-total">
                Total: {calculateSkillTotal(skill.name, skill.attributeModifier)}
              </div>
            </div>
          ))}
        </div>

        <div className="classes-container">
          <h2>Classes</h2>
          {(Object.keys(CLASS_LIST) as Class[]).map(className => (
            <div 
              key={className} 
              className={`class-item ${meetsClassRequirements(className) ? 'requirements-met' : 'requirements-not-met'} ${selectedClass === className ? 'selected' : ''}`}
              onClick={() => handleClassClick(className)}
            >
              <h3>{className}</h3>
              {selectedClass === className && (
                <div className="class-requirements">
                  <h4>Minimum Requirements:</h4>
                  {Object.entries(CLASS_LIST[className]).map(([attr, value]) => (
                    <div key={attr} className="requirement-item">
                      {attr}: {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
