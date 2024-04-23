import { useState } from 'react';
import './App.css';
import { ConfigKey, ConfigStorageSyncRepo } from './db/config.repo';

const configStorageSyncRepo = ConfigStorageSyncRepo.getInstance();

function App() {
    const [checked, setChecked] = useState<boolean>(false);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setChecked(newChecked);
        await configStorageSyncRepo.setAutoSkipIsEnabled(ConfigKey.autoSkip, newChecked);
    };

    return (
        <>
            <h2>인프런 자동 다음 수업보기</h2>
            <div className="card">
                <input type="checkbox" id="autoskip" name="autoskip" checked={checked} onChange={onChange}></input>
                <label htmlFor="autoskip">자동재생</label>
            </div>
        </>
    );
}

export default App;
