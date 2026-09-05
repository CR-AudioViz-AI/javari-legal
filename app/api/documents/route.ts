import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { secretKey, supabaseUrl } from "@craudioviz/platform-sdk";


/**
 * 2026-09-06: the caller's identity comes from their token, never from the request.
 *
 * This route took a user id from the caller and used it against a client built
 * with secretKey() - the service-role credential - which bypasses row level
 * security entirely, so it acted on whichever account the caller named.
 *
 * Found by the census: 1,657 routes enumerated across the estate, this one among
 * the 1,257 no hand-built list had ever contained.
 *
 * The gate builds its own client rather than assuming a helper exists. The first
 * version of this repair assumed a getSupabase() function and silently matched
 * nothing in six of the ten routes it was meant to fix - a repair that does not
 * apply is worse than one that fails loudly, because the report still says the
 * defect was addressed.
 */
async function __callerId(request: Request): Promise<string | null> {
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;
  if (!token) return null;
  try {
    const sb = createClient(supabaseUrl(), secretKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await sb.auth.getUser(token);
    if (error || !data?.user) return null;
    return data.user.id as string;
  } catch {
    return null;
  }
}

function __unauthorised() {
  return NextResponse.json(
    { error: 'Sign in required.', code: 'AUTH_REQUIRED' },
    { status: 401 },
  );
}

export async function POST(request: Request) {
  try {
    const {title, 
      originalContent, 
      convertedContent,
      documentType = 'other'} = await request.json();
    const userId = await __callerId(request);
    if (!userId) return __unauthorised();if (!userId || !title || !originalContent) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    const supabase = createClient(
      supabaseUrl(),
      secretKey(),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Try to save to database
    const { data, error } = await supabase
      .from('legalease_documents')
      .insert({
        user_id: userId,
        title,
        original_content: originalContent,
        converted_content: convertedContent,
        document_type: documentType,
        status: 'completed'
      })
      .select()
      .single()

    if (error) {
      // Table doesn't exist yet - that's OK, return success anyway
      if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('legalease_documents table not yet created - conversion successful but not saved')
        return NextResponse.json({
          success: true,
          saved: false,
          message: 'Document converted successfully. History feature will be available after database setup.',
          data: {
            id: `temp-${Date.now()}`,
            title,
            documentType,
            createdAt: new Date().toISOString()
          }
        })
      }
      
      // Other errors
      throw error
    }

    return NextResponse.json({
      success: true,
      saved: true,
      message: 'Document converted and saved successfully',
      data
    })

  } catch (error: any) {
    console.error('Save document error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to save document',
        details: error.message,
        success: false,
        saved: false
      }, 
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = await __callerId(request);
    if (!userId) return __unauthorised();if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const supabase = createClient(
      supabaseUrl(),
      secretKey(),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { data, error } = await supabase
      .from('legalease_documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      // Table doesn't exist yet
      if (error.code === '42P01' || error.message.includes('relation')) {
        return NextResponse.json({
          success: true,
          data: [],
          message: 'History feature not yet available'
        })
      }
      throw error
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch documents', details: error.message }, 
      { status: 500 }
    )
  }
}
