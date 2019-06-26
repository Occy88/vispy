function fetch_put(data){
    fetch(urlForProductRegistration + "/" + this.state.company.id.toString(), {
            method: 'PUT',
            credentials: 'include',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data_list)
        }).then(d => d.json()).then(d => {
            let li = d.map(a => a.id);
            alert(lang.success + "(" + lang.product_id_list + "):" + li.toString())
        })
}
