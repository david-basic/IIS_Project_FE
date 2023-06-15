export interface SelectOption {
	value: number;
	label: string;
	children?: SelectOption[];
	disabled?: boolean;
}
