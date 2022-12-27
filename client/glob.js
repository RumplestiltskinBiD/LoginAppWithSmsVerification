export function query({ type = 'POST', url, data }) {
    return new Promise(
        (res, rej) => $.ajax({
            type,
            url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success(data) {
                res(data);
            },
            error(err) {
                rej(err);
            }
        })
    );
}


