
import connectDB from '@/lib/config/db';
import Quote from '@/lib/models/QuoteModel';


const loadDB = async()=>{
    await connectDB();
}
loadDB();

export async function POST(request) {
    try {
       
        
        const { quote, author } = await request.json();
        
        if (!quote || !author) {
            return new Response(
                JSON.stringify({ success: false, message: 'Quote and author are required' }),
                { status: 400 }
            );
        }

        const newQuote = new Quote({
            quote,
            author
        });

        await newQuote.save();

        return new Response(
            JSON.stringify({ success: true, data: newQuote }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating quote:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Failed to create quote' }),
            { status: 500 }
        );
    }
}




export async function GET() {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        
        return new Response(
            JSON.stringify({ success: true, data: quotes }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Failed to fetch quotes' }),
            { status: 500 }
        );
    }
}



export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(
                JSON.stringify({ success: false, message: 'Quote ID is required' }),
                { status: 400 }
            );
        }

        const deletedQuote = await Quote.findByIdAndDelete(id);

        if (!deletedQuote) {
            return new Response(
                JSON.stringify({ success: false, message: 'Quote not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, data: deletedQuote, message: 'Quote deleted successfully' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting quote:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Failed to delete quote' }),
            { status: 500 }
        );
    }
}


export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const { quote, author } = await request.json();

        if (!id) {
            return new Response(
                JSON.stringify({ success: false, message: 'Quote ID is required' }),
                { status: 400 }
            );
        }

        if (!quote || !author) {
            return new Response(
                JSON.stringify({ success: false, message: 'Both quote and author are required' }),
                { status: 400 }
            );
        }

        const updatedQuote = await Quote.findByIdAndUpdate(
            id,
            { quote, author },
            { new: true, runValidators: true }
        );

        if (!updatedQuote) {
            return new Response(
                JSON.stringify({ success: false, message: 'Quote not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, data: updatedQuote }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating quote:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Failed to update quote' }),
            { status: 500 }
        );
    }
}