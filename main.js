document.addEventListener('DOMContentLoaded', function () {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const accordionButtons = document.querySelectorAll('.accordion-button');

    // Navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Activate clicked button and corresponding section
            button.classList.add('active');
            const targetId = button.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Scroll to top of content area for better UX on section change
            window.scrollTo({ top: document.querySelector('main').offsetTop - 80, behavior: 'smooth' });
        });
    });

    // Accordions
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const content = button.nextElementSibling;
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0px';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Chart.js for Linguagens
    const linguagensChartCtx = document.getElementById('linguagensChart');
    if (linguagensChartCtx) {
        new Chart(linguagensChartCtx, {
            type: 'bar',
            data: {
                labels: ['Interpretação de Texto', 'Literatura e Estrutura', 'Língua, Linguagem e TI', 'Artes, Cultura e Identidade', 'Variantes Linguísticas'],
                datasets: [{
                    label: '% de Recorrência (aprox.)',
                    data: [37.3, 20.7, 14.1, 12.3, 9.1],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)', // blue-500
                        'rgba(37, 99, 235, 0.7)',  // blue-600
                        'rgba(29, 78, 216, 0.7)',  // blue-700
                        'rgba(30, 64, 175, 0.7)',  // blue-800
                        'rgba(30, 58, 138, 0.7)'   // blue-900
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(37, 99, 235, 1)',
                        'rgba(29, 78, 216, 1)',
                        'rgba(30, 64, 175, 1)',
                        'rgba(30, 58, 138, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // Horizontal bar chart
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Percentual de Recorrência (%)'
                        }
                    },
                    y: {
                        ticks: {
                             autoSkip: false, // Ensure all labels are shown
                             callback: function(value, index, values) {
                                let label = this.getLabelForValue(value);
                                if (label.length > 20) { // Max length before wrapping attempt
                                    // Basic attempt to split, might need more sophisticated logic
                                    let parts = label.split(' ');
                                    let lines = [];
                                    let currentLine = '';
                                    parts.forEach(part => {
                                        if ((currentLine + part).length > 20 && currentLine.length > 0) {
                                            lines.push(currentLine.trim());
                                            currentLine = part + ' ';
                                        } else {
                                            currentLine += part + ' ';
                                        }
                                    });
                                    lines.push(currentLine.trim());
                                    return lines;
                                }
                                return label;
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Or true if you prefer
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    label += context.parsed.x + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
     // Activate the first section by default
    if (navButtons.length > 0) {
        navButtons[0].click(); // Simulate a click on the first nav button
    }
});