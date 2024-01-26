import React from "react";

import Modal from "../../../../Modal";
import QRCodeForVp from "./QRCodeForVP";
import {MatrixClientPeg} from "../../../../MatrixClientPeg";
import {getData} from "./util";

interface Certificate {
    label: string;
    path: string;
}

interface VPRequest {
    client_id: string;
    request_uri: string;
    polling_uri: string;
}

interface IProps {
    supportedCertificates: Certificate[];
}

export default class SelectAttribute extends React.Component<IProps, {}> {
    public constructor(props: IProps) {
        super(props);
    }

    private createVpUri = (parameters: VPRequest): string => {
        const uri = new URL("openid4vp://");
        uri.search = new URLSearchParams({
            client_id: parameters.client_id,
            request_uri: parameters.request_uri,
        }).toString();
        return uri.toString();
    };

    private showQrCodeModal = async (path: string)=> {
        const baseUrl = MatrixClientPeg.get()?.getHomeserverUrl()
        if (baseUrl){
            const vpRequest = await getData(new URL(path, baseUrl).toString()) as VPRequest
            if (vpRequest) {
                const pollingUri = vpRequest.polling_uri;
                const vpUri = this.createVpUri(vpRequest)
                Modal.createDialog(
                    QRCodeForVp,
                    {data: vpUri,
                        pollingUri: pollingUri}
                )
            }
        }
    }

    render() {

        return (
            <div>
                <h1>
                    証明したい属性を選んでください
                </h1>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 , display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        {this.props.supportedCertificates.slice(0, this.props.supportedCertificates.length / 2).map((button) => (
                            <button onClick={() => {this.showQrCodeModal(button.path)}} style={{margin: "16px"}}>{button.label}</button>
                        ))}
                    </div>
                    <div style={{ flex: 1 , display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        {this.props.supportedCertificates.slice(this.props.supportedCertificates.length / 2).map((button) => (
                            <button onClick={() => {this.showQrCodeModal(button.path)}} style={{margin: "16px"}}>{button.label}</button>
                        ))}
                    </div>
                </div>
            </div>

        );
    }
}

