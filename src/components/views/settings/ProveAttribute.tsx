import React from "react";
import QRCodeGenerator from "../auth/QRCodeGenerator";

interface IProps {
    data: string
    pollingUri: string
}


interface IState {
}

export default class ProveAttribute extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div>
                    <h1>ウォレットの証明書で認証</h1>
                    <h2>QRコードをウォレットで読み取って証明書を登録しましょう</h2>
                </div>
                <div>
                    <QRCodeGenerator
                        renderingData={this.props.data}
                        pollingUri={this.props.pollingUri}
                        callback={async (data: any) => {
                            console.log("vp callback called!!!!")
                        }}
                        showFromBeginning={true}
                    />
                </div>
            </div>
        )
    }

}
