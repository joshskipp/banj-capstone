'use server';
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function fetchAllProjects() {
  try{
    const
        data = await sql`
      SELECT * FROM projects`
    return data;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch all projects data.');
  }
}

export async function fetchAllUsers() {
    try {
        const data = await sql`
        SELECT * FROM users`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all users.');
    }
}

export async function fetchUserCount() {
    try {
        const data = await sql`
        SELECT COUNT(*) FROM users`
        return Number(data[0].count ?? '0');
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user count.');
    }
}

export async function fetchAllCommodities() {
    try {
        const data = await sql`
            SELECT * FROM commodities`
        return data;
    } catch (e){
         console.error('Database Error:', e);
         throw new Error('Failed to fetch all commodities.');
    }
}

export async function fetchCommodityProjects(id: string) {
    try {
        const data = await sql`
            select pc.project_id, pc.isprimary, pc.issecondary, projects.project_name, pc.commodity_id
            from project_commodities as pc
            inner join Projects on pc.project_id = projects.project_id
            where commodity_id = ${id};`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch projects for commodity.');
    }

}

export async function fetchCommodityById(id: string) {
    try {
        const data = await sql`
            SELECT * FROM commodities WHERE commodity_id=${id};`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch commodity with id ${id}.`);
    }
}

export async function fetchProjectById(id: string) {
    try {
      const [project] = await sql`
        SELECT * FROM projects
        WHERE project_id = ${id}
      `;
      return project || null; // Return the first result or null if not found
    } catch (error) {
      console.error('Error fetching project:', error);
      throw new Error('Failed to fetch project');
    }
  }

// Directly for each project
  export async function fetchAttachmentsByProjectId(projectId: string) {
    try {
      const data = await sql`
        SELECT * FROM attachments WHERE project_id = ${projectId}
      `;
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch attachments');
    }
  }

export async function fetchProjectsCommoditites(id: string) {
    try {
        const data = await sql`
            select pc.project_id, pc.isprimary, pc.issecondary, commodities.commodity_name, pc.commodity_id
            from project_commodities as pc
            inner join Commodities on pc.commodity_id = commodities.commodity_id
            where pc.project_id = ${id};
            `
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch projects for commodity.');
    }

}

const ITEMS_PER_PAGE = 100;

export async function fetchFilteredProjects(
    query: string,
    currentPage: number,  ) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const projects = await sql`
        SELECT * FROM projects
        WHERE
          projects.project_name ILIKE ${`%${query}%`} OR
          projects.product ILIKE ${`%${query}%`} 
        ORDER BY projects.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
  
      return projects;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch projects.');
    }
}
  
  
export async function fetchProjectsPages(query: string) {
      try {
        const data = await sql`SELECT COUNT(*)
        FROM projects
        WHERE
          projects.project_name ILIKE ${`%${query}%`} OR
          projects.product ILIKE ${`%${query}%`} 
      `;
    
        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
        return totalPages;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of projects.');
      }
    }



// FROM TEMPLATE
//
// import postgres from 'postgres';
// import {
//   CustomerField,
//   CustomersTableType,
//   InvoiceForm,
//   InvoicesTable,
//   LatestInvoiceRaw,
//   Revenue,
// } from './definitions';
// import { formatCurrency } from './utils';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function fetchRevenue() {
//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log('Fetching revenue data...');
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue[]>`SELECT * FROM revenue`;

//     // console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

// export async function fetchLatestInvoices() {
//   try {
//     const data = await sql<LatestInvoiceRaw[]>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }

// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0][0].count ?? '0');
//     const numberOfCustomers = Number(data[1][0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable[]>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   try {
//     const data = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   try {
//     const data = await sql<InvoiceForm[]>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `;

//     const invoice = data.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100,
//     }));

//     return invoice[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoice.');
//   }
// }

// export async function fetchCustomers() {
//   try {
//     const customers = await sql<CustomerField[]>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType[]>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }
