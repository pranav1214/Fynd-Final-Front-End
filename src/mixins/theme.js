export const themeMixin = {
    props: {
        theme: {
            type: String,
            validator( value ){
                return [
                    "primary",
                    "secondary",
                    "success",
                    "danger",
                    "warning",
                    "info",
                    "light",
                    "dark"
                ].includes( value );
            },
        },
    },
};