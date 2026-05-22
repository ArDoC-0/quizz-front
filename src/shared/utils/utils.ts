export function toFormdata(data : object) : FormData
{
    const formData =new FormData()

    Object.entries(data).forEach((value, key) => formData.append(key, value))

    return formData;
}

export function checkForm(form: unknown)
{
    let errors = 0;

    Object.entries(form).forEach((value, key) => {
        if(value)
        {
            errors+= 1
        }
    })
    console.log(errors);

    return errors > 0 ? false : true;
}

export function roleName(id: number)
{
    switch(id){
        case 1 : return 'admin';
        case 2 :return 'formateur';
        case 3 : return 'étudiant'
    }
}