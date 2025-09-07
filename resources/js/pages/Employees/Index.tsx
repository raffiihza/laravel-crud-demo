import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon, EditIcon, TrashIcon, EyeIcon } from 'lucide-react';

interface Employee {
    id: number;
    name: string;
    email: string;
    gender: 'male' | 'female';
    created_at: string;
    updated_at: string;
}

interface Props {
    employees: Employee[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
];

export default function EmployeesIndex({ employees, flash }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            router.delete(`/employees/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {flash.error}
                    </div>
                )}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle>Employee Management</CardTitle>
                            <CardDescription>
                                Manage your employees list
                            </CardDescription>
                        </div>
                        <Link href="/employees/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add Employee
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {employees.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">
                                    No employees found. 
                                    <Link href="/employees/create" className="text-primary hover:underline ml-1">
                                        Add your first employee
                                    </Link>
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                {employee.name}
                                            </TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant={employee.gender === 'male' ? 'default' : 'secondary'}
                                                    className="capitalize"
                                                >
                                                    {employee.gender}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(employee.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Link href={`/employees/${employee.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/employees/${employee.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <EditIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleDelete(employee.id)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
