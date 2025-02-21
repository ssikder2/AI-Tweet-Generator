import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileImage, faLocationDot, faGrin, faUser, faGlobeAsia } from "@fortawesome/free-solid-svg-icons"
import Image from 'next/image'

export default function Tweet(props) {

    return(
        <div className="generated-tweet">
            <div className="input-box">
                <p className="tweet-message">{props.content}</p>
                {props.isLoading && 
                    <div className="loading-image">
                        <p>Generating Image...</p>
                    </div>
                }
                {props.imageUrl && (
                    <Image 
                        src={props.imageUrl} 
                        alt="tweet generated image"
                        width={500} 
                        height={500} 
                        className="image" 
                    />
                )}
                <div className="privacy">
                    <FontAwesomeIcon icon={faGlobeAsia} />
                    <span>Everyone can reply</span>
                </div>
            </div>
            <div className="bottom">
                <ul className="icons">
                    <li><FontAwesomeIcon icon={faFileImage} /></li>
                    <li><FontAwesomeIcon icon={faLocationDot} /></li>
                    <li><FontAwesomeIcon icon={faGrin} /></li>
                    <li><FontAwesomeIcon icon={faUser} /></li>
                </ul>
                <button className="tweet-button">Tweet</button>
            </div>
        </div>
    )
}