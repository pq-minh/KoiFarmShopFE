import React from 'react';
import { Radio, Select } from 'antd';
import './index1.scss';

const HorizonFilter = ({ setValue}) => {
    const onChangeKoiOrBatch = (e) => {
        console.log('Radio checked:', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className='horizon-box'>
            <p>Products:</p>
            <div className='koi-batch'>
                <Radio.Group onChange={onChangeKoiOrBatch} style={{ fontSize: 20 }} defaultValue={"Kois"}>
                    <Radio value="Kois">Koi</Radio>
                    <Radio value="BatchKois">Batch Koi</Radio>
                </Radio.Group>
            </div>
           
        </div>
    );
};

export default HorizonFilter;
