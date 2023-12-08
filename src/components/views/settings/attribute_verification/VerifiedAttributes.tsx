import React, {Fragment} from "react";

import {getData} from "./util";
import Attribute, {AttributeProp, VPType} from "./Attribute";
import {MatrixClientPeg} from "../../../../MatrixClientPeg";


interface IProps {
    deletable: boolean;
}

interface IState {
    verifiedAttributes: VerifiedAttributeResponse[];
}

export interface Claims {
    [key: string]: any
}

export interface IssuerInfoClaims {
    issuer_name: string;
    issuer_address: string;
    issuer_domain: string;
}

interface VerifiedData {
    [num: string]: {
        main_claims: Claims;
        all_claims: Claims;
        issuer_info: IssuerInfoClaims;
    }
}

interface VerifiedAttributeResponse {
    vp_type: VPType;
    description_ja: string;
    verified_data: VerifiedData;
}


const SUPPORTED_VERIFICATION = [
    "/_matrix/client/v3/verify_by_server/ageOver13",
    "/_matrix/client/v3/verify_by_server/affiliation"
]

export default class VerifiedAttributes extends React.Component<IProps, IState> {
    public constructor(props: IProps){
        super(props);
        this.state = {
            verifiedAttributes: [],
        };
    }

    public async componentDidMount() {
        await this.retrieveVerifiedAttributes();
    }

    private retrieveVerifiedAttributes = async () => {
        const attributes: VerifiedAttributeResponse[] = []
        const baseUrl = MatrixClientPeg.get()?.getHomeserverUrl()
        if (baseUrl){
            for(const path of SUPPORTED_VERIFICATION){
                const data = await getData(new URL(path, baseUrl).toString())
                if (data){
                    const verifiedAttributeResponse = data as VerifiedAttributeResponse
                    const verified_data = verifiedAttributeResponse.verified_data
                    if (Object.keys(verified_data).length > 0){
                        attributes.push(verifiedAttributeResponse)
                    }
                }
            }
        }
        this.setState({ verifiedAttributes: attributes });
    }

    private createAttributeProps = (): AttributeProp[] => {
        const result: AttributeProp[] = []
        this.state.verifiedAttributes.forEach((verifiedAttributeResponse) => {
           const {vp_type, description_ja, verified_data} = verifiedAttributeResponse
            for(const num of Object.keys(verified_data)) {
                const mainClaims = verified_data[num].main_claims
                const allClaims = verified_data[num].all_claims
                const issuerInfo = verified_data[num].issuer_info
                result.push({
                    vp_type: vp_type,
                    description: description_ja,
                    num: num,
                    main_claims: mainClaims,
                    all_claims: allClaims,
                    issuer_info: issuerInfo,
                    deletable: this.props.deletable,
                })
            }
            }
        )
        return result
    }

    public render(): React.ReactNode {
        return (
            <Fragment>
                {this.createAttributeProps().map((attribute, index) => (
                        <Attribute
                            vp_type={attribute.vp_type}
                            description={attribute.description}
                            num={attribute.num}
                            main_claims={attribute.main_claims}
                            all_claims={attribute.all_claims}
                            issuer_info={attribute.issuer_info}
                            deletable={attribute.deletable}
                        />

                ))}
            </Fragment>
        )
    }
}
