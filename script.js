let allProducts = []; // Lưu trữ dữ liệu gốc từ API
let filteredProducts = []; // Dữ liệu sau khi tìm kiếm/sắp xếp

// 1. Hàm getAll lấy dữ liệu từ API
async function getAll() {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        allProducts = await response.json();
        filteredProducts = [...allProducts]; // Sao chép dữ liệu
        renderTable(filteredProducts.slice(0, 5)); // Hiển thị 5 cái đầu tiên
    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
    }
}

// 2. Hàm hiển thị dữ liệu ra bảng
function renderTable(data) {
    const tbody = document.getElementById('productBody');
    tbody.innerHTML = ""; // Xóa dữ liệu cũ

    data.forEach(item => {
        const row = `<tr>
            <td>${item.id}</td>
            <td><img src="${item.images[0]}" alt="${item.title}"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// 3. Tìm kiếm theo title (Xử lý onChange/onInput)
function handleSearch() {
    const text = document.getElementById('searchInput').value.toLowerCase();
    filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(text));
    handlePageSize(); // Cập nhật lại bảng theo số lượng trang đang chọn
}

// 4. Chia trang (5, 10, 20)
function handlePageSize() {
    const size = document.getElementById('pageSize').value;
    const dataToShow = filteredProducts.slice(0, size);
    renderTable(dataToShow);
}

// 5. Sắp xếp tăng/giảm
let isAsc = true;
function handleSort(type) {
    filteredProducts.sort((a, b) => {
        let valA = a[type];
        let valB = b[type];
        if (typeof valA === 'string') {
            return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return isAsc ? valA - valB : valB - valA;
    });
    isAsc = !isAsc; // Đảo chiều cho lần bấm sau
    handlePageSize();
}

// Chạy hàm khi mở trang
getAll();

