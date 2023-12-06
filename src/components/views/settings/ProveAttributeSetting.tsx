import React from "react";
import Modal from "../../../Modal";
import ProveAttribute from "./ProveAttribute";
import VerifiedMark from "./VerifiedMark";

interface IProps {
    homeserverUrl?: string;
}

interface IState {
}

interface VPRequest {
    client_id: string;
    request_uri: string;
    polling_uri: string;
}

const VERIFY_AGE = "/_matrix/client/v3/vp/ageOver13"
const VERIFY_AFFILIATION = "/_matrix/client/v3/vp/affiliation"

const VERIFY_RESULT_AGE = "/_matrix/client/v3/verify_age"
const VERIFY_RESULT_AFFILIATION = "/_matrix/client/v3/verify_affiliation"

export default class ProveAttributeSetting extends React.Component<IProps, IState> {
    public constructor(props: IProps){
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

    private fetchData = async (path: string): Promise<VPRequest | undefined> => {
        const url = new URL(path, this.props.homeserverUrl);
        const response = await fetch(url.toString());
        if (response.ok) {
            return await response.json() as VPRequest;
        }
        return undefined;
    }

    private showModal = async (path: string): Promise<void> => {
        const data = await this.fetchData(path)
        if (data) {
            const qrData = this.createVpUri(data);
            const pollingUri = data.polling_uri;
            const {finished} = Modal.createDialog(
                ProveAttribute,
                {data: qrData,
                    pollingUri: pollingUri}
            )
            await finished;
        }
    }

    private proveOverAge = async (): Promise<void> => {
        await this.showModal(VERIFY_AGE)
    }

    private proveAffiliation = async (): Promise<void> => {
        await this.showModal(VERIFY_AFFILIATION)
    }

    public render(): React.ReactNode {
        const spanStyle = {
            display: 'flex',
            gap: '20px', // 適切な間隔を指定してください
        };
       return (
              <div>
                  <div style={spanStyle}>
                      <VerifiedMark
                          url={new URL(VERIFY_RESULT_AGE, this.props.homeserverUrl).toString()}
                      />
                      <span>13以上であること</span>
                      <a onClick={this.proveOverAge}>証明する</a>
                  </div>
                  <div style={spanStyle}>
                      <VerifiedMark
                          url={new URL(VERIFY_RESULT_AFFILIATION, this.props.homeserverUrl).toString()}
                      />
                      <span>所属組織</span>
                      <a onClick={this.proveAffiliation}>追加する</a>
                  </div>
              </div>
       )
    }

}
