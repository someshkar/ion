const deletelink = (id) => {
    fetch('/api/deleteurl', {
        method: 'POST',
        body: JSON.stringify({
            shortUrl: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(window.location.reload())
}

