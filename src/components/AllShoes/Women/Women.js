import React from 'react'
import './Women.css'

import MenWomenFootwear from '../MenWomenFootwear/MenWomenFootwear'
import WGym from './wGym.jpg';
import WTennis from './wTennis.jpg';
import WJordan from './wJordan.jpg';
import WRunning from './wRunning.jpg';
import WFootball from './wFootball.jpg';
import WBasketball from './wBasketball.jpg';

const Women = () =>  {
    return (
        <div className="women">
            <div className="men__categories">
                <MenWomenFootwear
                    title = "Za gym"
                    image = {WGym}
                    pathTo = "wGym"
                    type = "women/"
                    />
                <MenWomenFootwear 
                    title="Zenske tenisice"
                    image={WTennis}
                    pathTo="wTennis"
                    type = "women/"
                    />
                <MenWomenFootwear 
                    title="Air Jordan"
                    image={WJordan}
                    pathTo="wJordan"
                    type = "women/"
                    />
                <MenWomenFootwear 
                    title="Za trcanje"
                    image={WRunning}
                    pathTo="wRunning"
                    type = "women/"
                    />
                <MenWomenFootwear 
                    title="Za nogomet"
                    image={WFootball}
                    pathTo="wFootball"
                    type = "women/"
                    />
                <MenWomenFootwear 
                    title="Kosarkaske"
                    image={WBasketball}
                    pathTo="wBasketball"
                    type = "women/"
                    />
            </div>
        </div>
    )
}

export default Women
