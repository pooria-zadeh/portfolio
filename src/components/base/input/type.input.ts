export type MInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    AppTypographyWeight &
    AppTypographyVariant &
    AppBaseColorType & {
        name: string;
        label?: string;
        multiline?: boolean;
        StartAdornment?: React.FC<any>;
        EndAdornment?: React.FC<any>;
        InputRoot?: React.FC<any>;
        InputComponent?: React.FC<any>;
        InputWrapper?: React.FC<any>;
        rootProps?: any;
        wrapperStyle?: AppStyle;
        inputStyle?: AppStyle;
        showOnError?:boolean
    };
