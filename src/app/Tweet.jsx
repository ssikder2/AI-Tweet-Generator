import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faLocationDot, faGrin, faUser, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";


export default function Tweet(props) {
    return(
        <div className="generated-tweet">
            <div className="input-box">
                <p className="tweet-message">{props.content}</p>
                {/* {imageSrc && <Image src={imageSrc} alt={tweet} width={475} height={475} className="image" />} */}
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