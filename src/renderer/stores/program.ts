import type { ProgramType } from '@/types'
import type { SelectOption } from 'naive-ui'

export interface Program {
  type: ProgramType
  name: string
  id: number | null
  detail: typeof programDetailTemplate[ProgramType]
}

export const programTypeName: Record<ProgramType, string> = {
  lsky: '兰空图床社区版',
  lskyPro: '兰空图床企业版V1',
  s3: 'S3(AWS/腾讯云/阿里云)',
}

export const programDetailTemplate = {
  lsky: {
    api: '',
    token: '',
    strategies: [] as ([] | SelectOption[]),
    activeStrategy: null as (number | null),
  },
  lskyPro: {
    api: '',
    token: '',
    strategies: [] as [],
    activeStrategy: null as (number | null),
  },
  s3: {
    /** accessKeyId */
    accessKeyId: '',
    /** secretAccessKey */
    secretAccessKey: '',
    /** 存储桶名称 */
    bucketName: '',
    /** 上传路径 */
    pathPrefix: '',
    /** 区域 */
    region: '',
    /** 自定义终端节点 */
    endpoint: '',
    /** 自定义域名 */
    customDomain: '',
    /** 是否启用S3 Path Style */
    forcePathStyle: false,
    /** 权限 */
    acl: '',
  },
}

export const useProgramStore = defineStore(
  'programStore',
  () => {
    const programs = ref<Program[]>([])

    function createProgram(type: ProgramType = 'lsky') {
      const id = Date.now()
      programs.value.push({
        type,
        name: '',
        id,
        detail: { ...programDetailTemplate[type] },
      })
      return id
    }

    function setProgramDetail(id: number, detail: Partial<typeof programDetailTemplate[ProgramType]>) {
      Object.assign(getProgram(id).detail, detail)
    }

    function setProgramName(id: number, name: string) {
      getProgram(id).name = name
    }

    function getProgramTypeName(type: ProgramType) {
      return programTypeName[type]
    }

    function getProgram(id: number | null): Program {
      // 考虑 defaultProgram 的id可能为 null 的情况
      const program = programs.value.find(item => item.id === id)
      // 防止开发过程中异常路由导致程序崩溃
      if (!program) {
        return { type: 'lsky', name: '', id: null, detail: programDetailTemplate.lsky }
      }
      return program
    }

    function getProgramList() {
      return programs.value.map(item => ({
        /** 程序名称 */
        label: item.name || getProgramTypeName(item.type),
        /** 程序ID */
        value: item.id as number,
        /** 程序类型 */
        type: item.type,
      }))
    }

    function removeProgram(id: number) {
      const index = programs.value.findIndex(item => item.id === id)
      if (index !== -1)
        programs.value.splice(index, 1)
      return Math.max(index - 1, 0)
    }

    return {
      programs,
      createProgram,
      setProgramDetail,
      setProgramName,
      getProgramTypeName,
      getProgramList,
      getProgram,
      removeProgram,
    }
  },
  {
    persistedState: {
      key: '__giopic_program_store__',
      includePaths: ['programs'],
    },
  },
)
