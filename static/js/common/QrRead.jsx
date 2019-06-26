import React from 'react';
import en from './lang_en.js'
import QrcodeDecoder from 'qrcode-decoder';
import Webcam from "react-webcam";

const lang = en;

/**
 *  Opens a camera,
 *  If a valid qr code is detected and read, a call back function is triggered with the value.
 */
export default class QrRead extends React.Component {
    /**
     * Props should set the variables for the list ( objects should be a string and an id)
     * Props should send api_url (url to get objects from)
     * @param props : object_list, handleRead (function)
     */
    constructor(props) {
        super(props);
        this.state = {
            qr_result: "",
        };
        // keep a ref to the video
        this.video = React.createRef();
        this.qr_decoder = new QrcodeDecoder();
        //    set the first value if there is one...
        this.capture = this.capture.bind(this);
    }

    /**
     * start capturing images for a potential qr code on a set interval
     */
    componentDidMount() {
        this.setState({interval_id: setInterval(this.capture, 500)})

    }

    capture() {
        this.qr_decoder.decodeFromVideo(this.video.current.video).then((res) => {
            //callback function to handle data.
            let data=null;
            try {
                data = JSON.parse(res.data);
            } catch (e) {
                console.log("Invalid Code");
                console.log(e);
            }
            if(data!==null)
                this.props.handleScan(JSON.parse(res.data));

        })
    }

    /**
     * Render the list with an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {
        // Need to declare a video source,
        // periodically capture images
        // pass images to a qr decoder
        // finally callback function if the result is valid.
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "environment"
        };
        return (
            <div className={"list_select_container"}>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.video}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
            </div>
        )
    }

}

