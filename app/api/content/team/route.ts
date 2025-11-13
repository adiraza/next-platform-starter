import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/dataStorage';
import type { TeamMember } from '@/lib/data';

export async function GET() {
  try {
    const members = getTeamMembers();
    console.log('GET /api/content/team - Returning', members.length, 'members');
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error in GET /api/content/team:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const member = await request.json();
    console.log('POST /api/content/team - Received member data:', JSON.stringify(member, null, 2));
    
    // Validate required fields
    if (!member.name || !member.designation || !member.department || !member.email || !member.bio || !member.experience) {
      console.error('POST /api/content/team - Missing required fields:', {
        name: !!member.name,
        designation: !!member.designation,
        department: !!member.department,
        email: !!member.email,
        bio: !!member.bio,
        experience: !!member.experience
      });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Ensure member has all required fields
    const memberToAdd: TeamMember = {
      id: member.id || Date.now().toString(),
      name: member.name,
      designation: member.designation,
      department: member.department,
      level: member.level || 'employee',
      photo: member.photo || '',
      email: member.email,
      phone: member.phone || '',
      linkedin: member.linkedin || '',
      bio: member.bio,
      experience: member.experience,
      achievements: member.achievements || [],
    };
    
    console.log('POST /api/content/team - Adding member:', JSON.stringify(memberToAdd, null, 2));
    addTeamMember(memberToAdd);
    const allMembers = getTeamMembers();
    console.log('POST /api/content/team - Success! Total members now:', allMembers.length);
    console.log('POST /api/content/team - All members:', JSON.stringify(allMembers, null, 2));
    return NextResponse.json({ success: true, member: memberToAdd, totalMembers: allMembers.length, allMembers });
  } catch (error) {
    console.error('POST /api/content/team - Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid data' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...member } = await request.json();
    console.log('PUT /api/content/team - Updating member ID:', id, 'with data:', member);
    const success = updateTeamMember(id, member);
    if (!success) {
      console.error('PUT /api/content/team - Member not found:', id);
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    const allMembers = getTeamMembers();
    console.log('PUT /api/content/team - Success! Total members:', allMembers.length);
    return NextResponse.json({ success: true, totalMembers: allMembers.length });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    const success = deleteTeamMember(id);
    if (!success) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

