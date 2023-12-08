import React from "react";

import AddVerifiedAttribute from "./AddVerifiedAttribute";
import VerifiedAttributes from "./VerifiedAttributes";

interface IProps {
}

interface IState {
}

export default class VerifiedAttributeSetting extends React.Component<IProps, IState> {
    public constructor(props: IProps){
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div>
                    <VerifiedAttributes
                        deletable={true} />
                </div>
                <div>
                    <AddVerifiedAttribute />
                </div>
            </div>
        )
    }

}
