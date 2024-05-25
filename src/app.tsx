import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import DOMPurify from 'dompurify';
import { convertToHTML } from './utils/mdConverter'
import { saveFile, copyText } from './utils/fileManager';
import Toast from './components/toast';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);

export default function App() {
    const [text, setText] = useState('');
    const [toasts, setToasts] = useState([]);

    const handleConvert = (e: any) => {
        let convertedText = convertToHTML(e.target.value); 
        setText(DOMPurify.sanitize(convertedText));
    };

    const handleCopy = (e: any) => {
        if (copyText((document.getElementById('raw-text') as HTMLTextAreaElement).value)) {
            setToasts([Toast({message: "Copied to clipboard"}), ...toasts]);
            setTimeout(() => setToasts(toasts => toasts.slice(0, -1)), 3000);
        } else {
            setToasts([Toast({message: "Failed to copy"}), ...toasts]);
            setTimeout(() => setToasts(toasts => toasts.slice(0, -1)), 3000);
        }
    };

    const handleSave = (e: any) => {
        const file = new Blob([(document.getElementById('raw-text') as HTMLTextAreaElement).value], { type: "text/plain" });
        const url = window.URL.createObjectURL(file);
        saveFile(url, "rawText.txt");
        window.URL.revokeObjectURL(url);
    };

    const toastsList = toasts.map((toast, index) => {
        return <div key={index} className='toast'>{toast}</div>;
    });

    return (
        <div className='main-container'>
            <div className='menu-container'>
                <div>
                    <span>Input</span>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCopy}>Copy</button>
                </div>
                <div>
                    <span>Output</span>
                </div>
            </div>
            <div className='workspace'>
                <div className='raw-text-container'>
                    <textarea id='raw-text' onChange={handleConvert}></textarea>
                </div>
                <div className='md-text-container'>
                    <div dangerouslySetInnerHTML={{__html: text}}></div>
                </div>
            </div>
            <div className='toast-container'>
                {toastsList}           
            </div>
        </div>
    );
}