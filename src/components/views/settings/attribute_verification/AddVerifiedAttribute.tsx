import React from "react";

import VerificationMark from "./VerificationMark";
import Modal from "../../../../Modal";
import SelectAttribute from "./SelectAttribute";

interface IProps {
}

interface IState {
}

const SUPPORTED_CERTIFICATES = [
    {label: "13歳以上であること", path: "/_matrix/client/v3/vp/ageOver13"},
    {label: "所属組織", path: "/_matrix/client/v3/vp/affiliation"},
    {label: "イベント参加", path: "/_matrix/client/v3/vp/joinConference"},
]

export default class AddVerifiedAttribute extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
    }

    private addCertificate = () => {
        Modal.createDialog(
           SelectAttribute,
            {supportedCertificates: SUPPORTED_CERTIFICATES}
        )
    }

    render() {
        const spanStyle = {
            marginTop: "5px",
            display: 'flex',
        };
        return (
            <span style={spanStyle}>
                <VerificationMark
                    isVerified={false}
                 />
                <a onClick={this.addCertificate}>属性の証明を追加する</a>
            </span>
        )
    }
}
