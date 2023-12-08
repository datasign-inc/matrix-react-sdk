import React from "react";
import {VPType} from "./Attribute";
import {Claims, IssuerInfoClaims} from "./VerifiedAttributes";

interface IProps {
    vp_type: VPType;
    description: string;
    main_claims: Claims;
    all_claims: Claims;
    issuer_info: IssuerInfoClaims;
}

interface IState {
}

export default class AttributeDetail extends React.Component<IProps, IState> {
    public constructor(props: IProps){
        super(props);
    }

    public render(): React.ReactNode {
        const style = {
            display: 'flex',
        };
        return (
            <div>
                <div>
                    <span style={style}>
                        <h1>以下の事業者によって認証されました</h1>
                    </span>
                    <div>
                        <h1>{this.props.issuer_info.issuer_name}</h1>
                    </div>
                    <div>
                        <h4>所在地</h4>
                        {this.props.issuer_info.issuer_address}
                    </div>
                    <div>
                        <h4>ドメイン名</h4>
                        {this.props.issuer_info.issuer_domain}
                    </div>
                </div>
            </div>
        )
    }
}
