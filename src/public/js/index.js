const uploadPath = window.location.href.replace('content', 'upload');

const dirPath = window.location.href.replace('content', 'dir');

const upbtn = window.document.getElementById('upbtn');

const dirmake = window.document.getElementById('dirmake');


upbtn.addEventListener('click', () => {  
    try {
        
        const form = window.document.getElementById('form')
        const input = window.document.getElementById('input')

        form.action = uploadPath;
        form.nodeName = 'file';
        input.nodeName = 'file';

        document.file.submit();

        setTimeout(1000);

    } catch (error) {
        console.error(error);
    }
})


dirmake.addEventListener('click', () => {
    try {

        const formdir = window.document.getElementById('dir')
        const inputdir = window.document.getElementById('dirinput')

        console.log(dirPath.length, dirPath);
        if (dirPath.length > 25) {
            formdir.action = dirPath + '--' + inputdir.value
        } else {
            formdir.action = dirPath + '/' + inputdir.value
        }

        document.name.submit()
        
    } catch (error) {
        console.error(error)
    }
})