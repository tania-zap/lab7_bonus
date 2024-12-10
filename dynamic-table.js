$(document).ready(function () {
    const apiUrl = "http://lab.vntu.org/api-server/lab7.php";

    // Функція для завантаження даних
    function loadData(sortBy = null) {
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (sortBy) {
                    data = data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
                }
                renderTable(data);
            },
            error: function (xhr, status, error) {
                console.error("Помилка завантаження даних:", error);
            }
        });
    }

    // Функція для відображення даних у таблиці
    function renderTable(data) {
        const tableBody = $("#table-body");
        tableBody.empty(); // Очищуємо таблицю
        data.forEach(item => {
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.affiliation}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Обробник для кнопки оновлення даних
    $("#refresh-data").click(function () {
        loadData();
    });

    // Обробники для сортування
    $("th[data-sort]").click(function () {
        const sortBy = $(this).data("sort");
        loadData(sortBy);
    });

    // Завантаження даних під час завантаження сторінки
    loadData();
});
