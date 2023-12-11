import React from "react";

import AddVerifiedAttribute from "./AddVerifiedAttribute";
import VerifiedAttributes from "./VerifiedAttributes";
import {MatrixClientPeg} from "../../../../MatrixClientPeg";

interface IProps {
}

interface IState {
}

export default class VerifiedAttributeSetting extends React.Component<IProps, IState> {
    public constructor(props: IProps){
        super(props);
    }

    public render(): React.ReactNode {
        const user_id  = MatrixClientPeg.safeGet().getUserId();
        return (
            <div>
                <div>
                    {user_id &&
                        <VerifiedAttributes
                            user_id={user_id}
                                deletable={true} />
                    }
                </div>
                <div>
                    <AddVerifiedAttribute />
                </div>
            </div>
        )
    }

}
