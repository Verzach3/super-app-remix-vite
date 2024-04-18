import { useState } from "react";
import type { ICreatorOptions } from "survey-creator-core";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SurveyCreatorReact = require("survey-creator-react");
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";

const { SurveyCreatorComponent, SurveyCreator } = SurveyCreatorReact;

const defaultCreatorOptions: ICreatorOptions = {
	showLogicTab: true,
	showTranslationTab: true,
};

export default function SurveyCreatorWidget(props: {
	json?: any;
	options?: ICreatorOptions;
}) {
	let [creator, setCreator] = useState<any>();

	if (!creator) {
		creator = new SurveyCreator(props.options || defaultCreatorOptions);
		creator.saveSurveyFunc = (
			no: number,
			callback: (num: number, status: boolean) => void,
		) => {
			console.log(JSON.stringify(creator?.JSON));
			callback(no, true);
		};
		setCreator(creator);
	}

	creator.JSON = props.json || {};

	return (
			<SurveyCreatorComponent creator={creator} />
	);
}
