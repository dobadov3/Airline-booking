var nameProfile = document.getElementById("profile-name");

axios.get("http://localhost:3001/api/account").then(res => {
    nameProfile.textContent = res.data.name

    if (res.data.role !== "admin"){
        var navContainer = document.getElementById("nav-container");
        var li_user = document.getElementById("li-user")
        var li_role = document.getElementById("li-role")
        navContainer.removeChild(li_user);
        navContainer.removeChild(li_role);
    }
});