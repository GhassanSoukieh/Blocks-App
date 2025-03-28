import { useState } from 'react'
import Block from '../../data/block.js';


function homepage () {

    const [blocks, setBlocks] = useState([])
    const [currentBlock, setCurrentBlock] = useState(null)

    const createBlock = () => {
        const newBlock = new Block();
        setCurrentBlock(newBlock);
    }

    const updateBlockInfo = (field, value) => {
        // Update the current block's information
        if (currentBlock) {
            const updatedBlock = {...currentBlock};
            updatedBlock[field] = value;
            setCurrentBlock(updatedBlock);
        }
    }

    const saveBlock = () => {
        fetch('http://localhost:5100/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentBlock)
        })
    }
    return (
        <div>
            <h1>Welcome to Blocks</h1>
            <button onClick={createBlock}>Create a block</button>

            {/* Block creation form - appears when a new block is created */}
            {currentBlock && (
                <div className='p-4 flex flex-col gap-4 z-index:2' >
                    <input 
                        type="text" 
                        placeholder="Block Title" 
                        value={currentBlock.title || ''}
                        onChange={(e) => updateBlockInfo('title', e.target.value)}
                    />
                    <textarea 
                        placeholder="Block Content" 
                        value={currentBlock.content || ''}
                        onChange={(e) => updateBlockInfo('content', e.target.value)}
                    />
                    <input 
                        type="date" 
                        value={currentBlock.date || ''} 
                        onChange={(e) => updateBlockInfo('date', e.target.value)} 
                    />
                    <button onClick={saveBlock}>Save Block</button>
                </div>
            )}

            {/* Display existing blocks */}
            <div className='p-4 flex flex-col gap-4 bg-[rgb(101,194,19)]'>
                {blocks.map((block, index) => (
                    <div key={index} >
                        <h2>{block.title}</h2>
                        <p>{block.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default homepage;