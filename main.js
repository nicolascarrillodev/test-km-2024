
document.addEventListener('DOMContentLoaded', () => {
    const supabaseUrl = 'https://iqbvssqyedzxoljbvlez.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxYnZzc3F5ZWR6eG9samJ2bGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3MzY0ODAsImV4cCI6MjAzMjMxMjQ4MH0.QmLU-uGwgJjf_XrQvis_bxFUT5cGrHdWuoOK_9QCfYY';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    async function fetchProductos() {
        console.log('Fetching productos...');
        const { data: productos, error: errorProductos } = await supabase
            .from('productos')
            .select('*');

        if (errorProductos) {
            console.error('Error fetching productos:', errorProductos);
            return;
        }

        console.log('Productos fetched:', productos);

        for (const producto of productos) {
            console.log(`Fetching imagenes for producto ID: ${producto.id}`);
            const { data: imagenes, error: errorImagenes } = await supabase
                .from('imagenes')
                .select('*')
                .eq('producto_id', producto.id);

            if (errorImagenes) {
                console.error('Error fetching imagenes:', errorImagenes);
                return;
            }

            console.log(`Imagenes fetched for producto ID: ${producto.id}:`, imagenes);
            producto.imagenes = imagenes;
        }

        displayProductos(productos);
    }

    function displayProductos(productos) {
        const productosDiv = document.getElementById('productos');
        console.log('Displaying productos...');
        productosDiv.innerHTML = productos.map(producto => `
            <div>
                <h2>${producto.titulo}</h2>
                <p>Precio: ${producto.precio}</p>
                <p>Fecha: ${producto.fecha}</p>
                <p>Vacantes: ${producto.vacantes}</p>
                <div>
                    ${producto.imagenes.map(imagen => `<img src="${imagen.imagen_url}" alt="${producto.titulo}" height="200" width="200">`).join('')}
                </div>
            </div>
        `).join('');
    }

    fetchProductos();
});
