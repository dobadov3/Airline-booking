var ticketItem = function(ticket){
    return `
    <tr>
        <td>${ticket.code}</td>
        <td>${ticket.route}</td>
        <td>${ticket.ticket_class}</td>
        <td>${ticket.price}</td>
        ${
            (() => {
                if (ticket.status === "Vẫn còn"){
                    return `<td><span class="badge badge-success">${ticket.status}</span></td>`;
                }else if (ticket.status === "Đã đặt"){
                    return `<td><span class="badge badge-danger">${ticket.status}</span></td>`;
                }
            })()
        }
        <td>
            <a href="/tickets/edit/${ticket._id}">
                <button class="btn btn-inverse-primary btn-icon" type="button">
                    <i class="mdi mdi-pencil"> </i>
                </button>
            </a>
        </td>
    </tr>`
}

var select_route = document.getElementById("select-route");
var select_ticket_class = document.getElementById("select-ticket-class");

var changeTicket = function(){
    axios.get(`http://localhost:3001/api/ticket/${select_route.value}/${select_ticket_class.value}`).then(res => {
        var textInner = ''
        res.data.forEach(ticket => {
            textInner += ticketItem(ticket);
        })

        document.getElementById("ticket").innerHTML = textInner;
    })
}

var search = function(){
    var value = document.getElementById("input-search").value;
    axios.get(`http://localhost:3001/api/ticket/${select_route.value}/${select_ticket_class.value}/${value}`).then(res => {
        var textInner = ''
        res.data.forEach(ticket => {
            textInner += ticketItem(ticket);
        })

        document.getElementById("ticket").innerHTML = textInner;
    })
}

changeTicket()

