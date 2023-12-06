
import React, {Fragment} from "react";
import { MatrixClientPeg } from "../../../MatrixClientPeg";

interface IProps {
    url: string;
}

interface VerificationResult {
    verification_status: string;
}

interface IState {
    data: VerificationResult | undefined;
    isLoading: boolean;
}

export default class VerifiedMark extends React.Component<IProps, IState> {

    componentDidMount() {
        // todo: Executing the API should be implemented as a MatrixClient function.
        fetch(this.props.url,
            {headers:
                    {Authorization: `Bearer ${MatrixClientPeg.safeGet().getAccessToken()}`}} )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: VerificationResult) => {
                this.setState({ data, isLoading: false });
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                this.setState({ isLoading: false });
            });
    }

    public constructor(props: IProps) {
        super(props);
        this.state = {
            data: undefined,
            isLoading: true,
        };
    }


    render() {
        const { data, isLoading } = this.state;

        if (isLoading) {
            return <Fragment />;
        }

        return (
            <Fragment>
                {data?.verification_status === 'ok' ?
                    <span className={"mx_ProfileVerifiedMark"}></span> :
                    <span className={"mx_ProfileUnVerifiedMark"}></span>}
            </Fragment>
        );
    }


}
