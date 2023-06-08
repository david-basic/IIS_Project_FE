import { ReactElement } from "react";
import Header from "./Header";

interface Props {
	children: ReactElement;
}

const MainLayout: React.FC<Props> = (props: Props) => {
    const { children } = props;

	return <>
        <Header/>
        <div className="container pt-5">
            {children}
        </div>
    </>;
};

export default MainLayout;
