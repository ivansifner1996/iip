import React from 'react'
import './Men.css';
import MenWomenFootwear from '../MenWomenFootwear/MenWomenFootwear';
import MGym from './mGym.jpg';
import MTennis from './mTennis.jpeg';
import MJordan from './mJordan.jpg';
import MRunning from './mRunning.jpg';
import MFootball from './mFootball.jpg';
import MBasketball from './mBasketball.jpg';

const Men = () => {
    return (
        <div className="men">
            <div className="men__categories">
                <MenWomenFootwear
                    title= "Za gym"
                    image = {MGym}
                    pathTo = "mGym"
                    type = "men/"
                    />
                <MenWomenFootwear 
                    title="Muske tenisice"
                    image={MTennis}
                    pathTo="mTennis"
                    type = "men/"
                    />
                <MenWomenFootwear 
                    title="Air Jordan"
                    image={MJordan}
                    pathTo="mJordan"
                    type = "men/"
                    />
                <MenWomenFootwear 
                    title="Za trcanje"
                    image={MRunning}
                    pathTo="mRunning"
                    type = "men/"
                    />
                <MenWomenFootwear 
                    title="Za nogomet"
                    image={MFootball}
                    pathTo="mFootball"
                    type = "men/"
                    />
                <MenWomenFootwear 
                    title="Kosarkaske"
                    image={MBasketball}
                    pathTo="mBasketball"
                    type = "men/"
                    />
            </div>
        </div>
    )
}

export default Men
