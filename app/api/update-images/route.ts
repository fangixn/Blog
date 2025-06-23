import { NextRequest, NextResponse } from 'next/server';
import { updateProjectImages } from '@/lib/screenshot';
import { projects } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    console.log('开始更新项目图片...');
    
    // 提取项目基本信息用于更新图片
    const projectsInfo = projects.map(project => ({
      id: project.id,
      link: project.link,
      title: project.title
    }));
    
    // 获取更新后的图片URLs
    const updatedImages = await updateProjectImages(projectsInfo);
    
    // 返回更新结果
    return NextResponse.json({
      success: true,
      message: '项目图片更新完成',
      data: updatedImages,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('更新项目图片失败:', error);
    
    return NextResponse.json({
      success: false,
      message: '更新项目图片失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 支持POST请求来手动触发更新
export async function POST(request: NextRequest) {
  return GET(request);
} 