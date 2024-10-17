import React from 'react';
import { Radio, Select } from 'antd';
import './index1.scss';

const HorizonFilter = ({ setValue,setsortBy }) => {
    const onChangeKoiOrBatch = (e) => {
        console.log('Radio checked:', e.target.value);
        setValue(e.target.value);
    };

    const handleChange = (e) => {
        setsortBy(e);
    };

    return (
        <div className='horizon-box'>
            <p>Sản phẩm:</p>
            <div className='koi-batch'>
                <Radio.Group onChange={onChangeKoiOrBatch} style={{ fontSize: 20 }} defaultValue={"Kois"}>
                    <Radio value="Kois">Koi</Radio>
                    <Radio value="BatchKois">Batch Koi</Radio>
                </Radio.Group>
            </div>
            <p>Giá:</p>
            <div className='price-order'>
                <Select
                    defaultValue="Sắp xếp theo"
                    style={{
                        marginLeft: 5,
                        width: 120,
                        height: 30,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'price_asc',
                            label: 'Tăng dần',
                        },
                        {
                            value: 'price_desc',
                            label: 'Giam dần',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default HorizonFilter;
