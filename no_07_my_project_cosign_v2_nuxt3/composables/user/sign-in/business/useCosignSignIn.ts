export function useCosignSignIn(inputNameArray: string[]) {
    const isActiveSubmitButton = ref<boolean>(false);
    
    const inputValueLengths: number[] = [];

    for (let i = 0; i < inputNameArray.length; i ++) {
        inputValueLengths.push(0);
    }

    const onChangeFormValue = (e:Event) => {
        const target = e.target as HTMLInputElement;
        const value = target.value.trim();

        inputNameArray.forEach((name,idx) => {
            if (target.name === name) {
                inputValueLengths[idx] = value.length;
            }
        })
    
        if (inputValueLengths.every(length => length > 0)) {
            isActiveSubmitButton.value = true;
        } else {
            isActiveSubmitButton.value = false;
        }
    }

    return {
        isActiveSubmitButton,
        onChangeFormValue
    }
}